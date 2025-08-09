import { Request, Response } from "express";
import { Question, Answer } from "../models";

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.findAll({
      include: [{ model: Answer, as: "answers" }],
    });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting questions" });
  }
};
