"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestions = void 0;
const models_1 = require("../models");
const getQuestions = async (_req, res) => {
    try {
        const questions = await models_1.Question.findAll({
            include: [
                {
                    model: models_1.Category,
                    as: "category",
                    attributes: ["id", "name"],
                },
                {
                    model: models_1.Answer,
                    as: "answers",
                },
            ],
        });
        res.json(questions);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching questions" });
    }
};
exports.getQuestions = getQuestions;
