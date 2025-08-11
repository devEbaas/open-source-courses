"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssessmentResultDetail = exports.listAssessmentResults = exports.submitAssessment = exports.getAssessment = void 0;
const models_1 = require("../models");
const PER_CATEGORY = 5;
const getAssessment = async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).json({ error: 'id inválido' });
    const assessment = await models_1.Assessment.findByPk(id, {
        attributes: ['id', 'name', 'description'],
        include: [{ model: models_1.Course, as: 'course', attributes: ['id', 'name', 'description'] }]
    });
    if (!assessment)
        return res.status(404).json({ error: 'No encontrado' });
    const questions = await models_1.Question.findAll({
        where: { assessmentId: id },
        include: [
            { model: models_1.Answer, as: 'answers', attributes: ['id', 'text', 'isCorrect'] },
            { model: models_1.Category, as: 'category', attributes: ['id', 'name'] },
        ]
    });
    const byCat = new Map();
    for (const q of questions) {
        const cid = q.categoryId;
        if (!byCat.has(cid))
            byCat.set(cid, []);
        byCat.get(cid).push(q);
    }
    const groups = Array.from(byCat.values()).slice(0, 2).map(arr => arr.slice(0, PER_CATEGORY));
    const flat = groups.flat();
    res.json({ assessment, questions: flat });
};
exports.getAssessment = getAssessment;
const submitAssessment = async (req, res) => {
    const assessmentId = Number(req.params.id);
    if (Number.isNaN(assessmentId))
        return res.status(400).json({ error: 'assessmentId inválido' });
    const { userId, answers } = req.body;
    if (!userId || !Array.isArray(answers))
        return res.status(400).json({ error: 'userId y answers requeridos' });
    const assessment = await models_1.Assessment.findByPk(assessmentId);
    if (!assessment)
        return res.status(404).json({ error: 'Assessment no encontrado' });
    const user = await models_1.User.findByPk(userId);
    if (!user)
        return res.status(404).json({ error: 'User no encontrado' });
    const questionIds = answers.map(a => a.questionId);
    const dbQuestions = await models_1.Question.findAll({ where: { id: questionIds, assessmentId }, include: [{ model: models_1.Answer, as: 'answers' }] });
    const answerMap = new Map();
    for (const a of answers)
        answerMap.set(a.questionId, a.answerId);
    let score = 0;
    const details = [];
    for (const q of dbQuestions) {
        const selectedAnswerId = answerMap.get(q.id) || null;
        const correct = q.answers.find((ans) => ans.isCorrect);
        const isCorrect = selectedAnswerId != null && correct && correct.id === selectedAnswerId;
        if (isCorrect)
            score++;
        details.push({ assessmentResultId: 0, questionId: q.id, questionText: q.text, selectedAnswerId, correctAnswerId: correct ? correct.id : null, isCorrect });
    }
    const totalQuestions = dbQuestions.length;
    const result = await models_1.AssessmentResult.create({ userId, assessmentId, score, totalQuestions });
    for (const d of details)
        d.assessmentResultId = result.id;
    await models_1.AssessmentResultQuestion.bulkCreate(details);
    res.status(201).json({ resultId: result.id, score, totalQuestions });
};
exports.submitAssessment = submitAssessment;
const listAssessmentResults = async (req, res) => {
    const assessmentId = Number(req.params.id);
    if (Number.isNaN(assessmentId))
        return res.status(400).json({ error: 'assessmentId inválido' });
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const where = { assessmentId };
    if (userId)
        where.userId = userId;
    const results = await models_1.AssessmentResult.findAll({ where, order: [['id', 'DESC']] });
    res.json(results);
};
exports.listAssessmentResults = listAssessmentResults;
const getAssessmentResultDetail = async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).json({ error: 'id inválido' });
    const result = await models_1.AssessmentResult.findByPk(id, { include: [{ model: models_1.Assessment, as: 'assessment', attributes: ['id', 'name'] }, { model: models_1.User, as: 'user', attributes: ['id', 'name', 'email'] }] });
    if (!result)
        return res.status(404).json({ error: 'No encontrado' });
    const detail = await models_1.AssessmentResultQuestion.findAll({ where: { assessmentResultId: id }, include: [{ model: models_1.Question, as: 'question', attributes: ['id', 'categoryId'], include: [{ model: models_1.Category, as: 'category', attributes: ['id', 'name'] }] }], order: [['id', 'ASC']] });
    const map = new Map();
    for (const row of detail) {
        const q = row.question;
        const cat = q?.category;
        const categoryId = cat?.id || 0;
        const categoryName = cat?.name || 'Desconocida';
        if (!map.has(categoryId))
            map.set(categoryId, { categoryId, categoryName, correct: 0, incorrect: 0, total: 0 });
        const agg = map.get(categoryId);
        if (row.isCorrect)
            agg.correct++;
        else
            agg.incorrect++;
        agg.total++;
    }
    const categories = Array.from(map.values()).sort((a, b) => a.categoryId - b.categoryId);
    res.json({ result, detail, categories });
};
exports.getAssessmentResultDetail = getAssessmentResultDetail;
