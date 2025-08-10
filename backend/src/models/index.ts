import { Sequelize } from "sequelize";
import QuestionModel from "./Question";
import AnswerModel from "./Answer";
import CategoryModel from "./Category";
import CourseModel from './Course';
import AssessmentModel, { Assessment } from './Assessment';
import UserModel from './User';
import AssessmentResultModel, { AssessmentResult } from './AssessmentResult';
import AssessmentResultQuestionModel, { AssessmentResultQuestion } from './AssessmentResultQuestion';

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
export const Course = CourseModel(sequelize);
export const AssessmentInstance = AssessmentModel(sequelize);
export { AssessmentInstance as Assessment };
export const Question = QuestionModel(sequelize);
export const Answer = AnswerModel(sequelize);
export const User = UserModel(sequelize);
export const AssessmentResultInstance = AssessmentResultModel(sequelize);
export { AssessmentResultInstance as AssessmentResult };
export const AssessmentResultQuestionInstance = AssessmentResultQuestionModel(sequelize);
export { AssessmentResultQuestionInstance as AssessmentResultQuestion };

Category.hasMany(Question, { foreignKey: "categoryId", as: "questions" });
Question.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

Course.hasOne(AssessmentInstance, { foreignKey: 'courseId', as: 'assessment' });
AssessmentInstance.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
AssessmentInstance.hasMany(Question, { foreignKey: 'assessmentId', as: 'questions' });
Question.belongsTo(AssessmentInstance, { foreignKey: 'assessmentId', as: 'assessment' });

Question.hasMany(Answer, { foreignKey: "questionId", as: "answers" });
Answer.belongsTo(Question, { foreignKey: "questionId", as: "question" });

// User Results associations
User.hasMany(AssessmentResultInstance, { foreignKey: 'userId', as: 'results' });
AssessmentResultInstance.belongsTo(User, { foreignKey: 'userId', as: 'user' });
AssessmentInstance.hasMany(AssessmentResultInstance, { foreignKey: 'assessmentId', as: 'results' });
AssessmentResultInstance.belongsTo(AssessmentInstance, { foreignKey: 'assessmentId', as: 'assessment' });

AssessmentResultInstance.hasMany(AssessmentResultQuestionInstance, { foreignKey: 'assessmentResultId', as: 'detail' });
AssessmentResultQuestionInstance.belongsTo(AssessmentResultInstance, { foreignKey: 'assessmentResultId', as: 'result' });
AssessmentResultQuestionInstance.belongsTo(Question, { foreignKey: 'questionId', as: 'question' });
