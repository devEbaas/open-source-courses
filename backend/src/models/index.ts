import { Sequelize } from "sequelize";
import QuestionModel from "./Question";
import AnswerModel from "./Answer";
import CategoryModel from "./Category";

const DB_NAME = process.env.DB_NAME || 'courses';
const DB_USER = process.env.DB_USER || 'root';
// Compatibilidad: permitir DB_PASS o DB_PASSWORD
const DB_PASSWORD = process.env.DB_PASSWORD || process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

export const Category = CategoryModel(sequelize);
export const Question = QuestionModel(sequelize);
export const Answer = AnswerModel(sequelize);

Category.hasMany(Question, { foreignKey: "categoryId", as: "questions" });
Question.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

Question.hasMany(Answer, { foreignKey: "questionId", as: "answers" });
Answer.belongsTo(Question, { foreignKey: "questionId", as: "question" });
