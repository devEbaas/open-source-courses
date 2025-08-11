import { Request, Response } from 'express'
import { Assessment, Course, Question, Answer, Category, User, AssessmentResult, AssessmentResultQuestion } from '../models'

const PER_CATEGORY = 5

export const getAssessment = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' })
  const assessment = await Assessment.findByPk(id, {
    attributes: ['id','name','description'],
    include: [{ model: Course, as: 'course', attributes: ['id','name','description'] }]
  })
  if (!assessment) return res.status(404).json({ error: 'No encontrado' })
  const questions = await Question.findAll({
    where: { assessmentId: id },
    include: [
      { model: Answer, as: 'answers', attributes: ['id','text','isCorrect'] },
      { model: Category, as: 'category', attributes: ['id','name'] },
    ]
  })
  const byCat = new Map<number, any[]>()
  for (const q of questions) {
    const cid = (q as any).categoryId as number
    if (!byCat.has(cid)) byCat.set(cid, [])
    byCat.get(cid)!.push(q)
  }
  const groups = Array.from(byCat.values()).slice(0,2).map(arr=>arr.slice(0, PER_CATEGORY))
  const flat = groups.flat()
  res.json({ assessment, questions: flat })
}

export const submitAssessment = async (req: Request, res: Response) => {
  const assessmentId = Number(req.params.id)
  if (Number.isNaN(assessmentId)) return res.status(400).json({ error: 'assessmentId inválido' })
  const { userId, answers } = req.body as { userId: number; answers: { questionId: number; answerId: number }[] }
  if (!userId || !Array.isArray(answers)) return res.status(400).json({ error: 'userId y answers requeridos' })
  const assessment = await Assessment.findByPk(assessmentId)
  if (!assessment) return res.status(404).json({ error: 'Assessment no encontrado' })
  const user = await User.findByPk(userId)
  if (!user) return res.status(404).json({ error: 'User no encontrado' })
  const questionIds = answers.map(a=>a.questionId)
  const dbQuestions = await Question.findAll({ where: { id: questionIds, assessmentId }, include: [{ model: Answer, as: 'answers' }] })
  const answerMap = new Map<number, number>()
  for (const a of answers) answerMap.set(a.questionId, a.answerId)
  let score = 0
  const details: any[] = []
  for (const q of dbQuestions) {
    const selectedAnswerId = answerMap.get(q.id) || null
    const correct = (q as any).answers.find((ans: any)=>ans.isCorrect)
    const isCorrect = selectedAnswerId != null && correct && correct.id === selectedAnswerId
    if (isCorrect) score++
    details.push({ assessmentResultId: 0, questionId: q.id, questionText: (q as any).text, selectedAnswerId, correctAnswerId: correct ? correct.id : null, isCorrect })
  }
  const totalQuestions = dbQuestions.length
  const result = await AssessmentResult.create({ userId, assessmentId, score, totalQuestions })
  for (const d of details) d.assessmentResultId = result.id
  await AssessmentResultQuestion.bulkCreate(details)
  res.status(201).json({ resultId: result.id, score, totalQuestions })
}

export const listAssessmentResults = async (req: Request, res: Response) => {
  const assessmentId = Number(req.params.id)
  if (Number.isNaN(assessmentId)) return res.status(400).json({ error: 'assessmentId inválido' })
  const userId = req.query.userId ? Number(req.query.userId) : undefined
  const where: any = { assessmentId }
  if (userId) where.userId = userId
  const results = await AssessmentResult.findAll({ where, order: [['id','DESC']] })
  res.json(results)
}

export const getAssessmentResultDetail = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' })
  const result = await AssessmentResult.findByPk(id, { include: [ { model: Assessment, as: 'assessment', attributes: ['id','name'] }, { model: User, as: 'user', attributes: ['id','name','email'] } ] })
  if (!result) return res.status(404).json({ error: 'No encontrado' })
  const detail = await AssessmentResultQuestion.findAll({ where: { assessmentResultId: id }, include: [{ model: Question, as: 'question', attributes: ['id','categoryId'], include: [{ model: Category, as: 'category', attributes: ['id','name'] }] }], order: [['id','ASC']] })
  interface CatAgg { categoryId: number; categoryName: string; correct: number; incorrect: number; total: number }
  const map = new Map<number, CatAgg>()
  for (const row of detail as any[]) {
    const q = row.question
    const cat = q?.category
    const categoryId = cat?.id || 0
    const categoryName = cat?.name || 'Desconocida'
    if (!map.has(categoryId)) map.set(categoryId, { categoryId, categoryName, correct: 0, incorrect: 0, total: 0 })
    const agg = map.get(categoryId)!
    if (row.isCorrect) agg.correct++ ; else agg.incorrect++
    agg.total++
  }
  const categories = Array.from(map.values()).sort((a,b)=>a.categoryId-b.categoryId)
  res.json({ result, detail, categories })
}
