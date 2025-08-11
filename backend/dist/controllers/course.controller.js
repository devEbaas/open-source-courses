"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourse = exports.listCourses = void 0;
const models_1 = require("../models");
const listCourses = async (_req, res) => {
    const courses = await models_1.Course.findAll({
        attributes: ['id', 'name', 'description'],
        include: [{ model: models_1.Assessment, as: 'assessment', attributes: ['id', 'name', 'description'] }]
    });
    res.json(courses);
};
exports.listCourses = listCourses;
const getCourse = async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).json({ error: 'id inválido' });
    const course = await models_1.Course.findByPk(id, {
        attributes: ['id', 'name', 'description'],
        include: [{ model: models_1.Assessment, as: 'assessment', attributes: ['id', 'name', 'description'] }]
    });
    if (!course)
        return res.status(404).json({ error: 'No encontrado' });
    res.json(course);
};
exports.getCourse = getCourse;
