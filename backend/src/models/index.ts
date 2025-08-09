import { Sequelize } from "sequelize";
import QuestionModel from "./Question";
import AnswerModel from "./Answer";

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export const Question = QuestionModel(sequelize);
export const Answer = AnswerModel(sequelize);

Question.hasMany(Answer, { foreignKey: "questionId", as: "answers" });
Answer.belongsTo(Question, { foreignKey: "questionId", as: "question" });
