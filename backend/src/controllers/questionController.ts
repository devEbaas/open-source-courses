import { Request, Response } from "express";
import { Question, Answer, Category } from '../models';

export const getQuestions = async (_req: Request, res: Response) => {
  try {
    const questions = await Question.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Answer,
          as: "answers",
        },
      ],
    });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching questions" });
  }
};
