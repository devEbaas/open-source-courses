import { Course, Assessment } from '../models';
export const listCourses = async (_req, res) => {
    const courses = await Course.findAll({
        attributes: ['id', 'name', 'description'],
        include: [{ model: Assessment, as: 'assessment', attributes: ['id', 'name', 'description'] }]
    });
    res.json(courses);
};
export const getCourse = async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).json({ error: 'id inválido' });
    const course = await Course.findByPk(id, {
        attributes: ['id', 'name', 'description'],
        include: [{ model: Assessment, as: 'assessment', attributes: ['id', 'name', 'description'] }]
    });
    if (!course)
        return res.status(404).json({ error: 'No encontrado' });
    res.json(course);
};
