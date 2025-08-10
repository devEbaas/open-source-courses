import { Sequelize } from "sequelize";
import QuestionModel from "./Question";
import AnswerModel from "./Answer";
import CategoryModel from "./Category";
import CourseModel from './Course';
import { DataTypes } from 'sequelize';

// Modelo Assessment inline para mantener consistencia rápida
import { Model, Optional } from 'sequelize';
interface AssessmentAttributes { id: number; title: string; description: string }
interface AssessmentCreation extends Optional<AssessmentAttributes, 'id'> {}
class Assessment extends Model<AssessmentAttributes, AssessmentCreation> implements AssessmentAttributes {
  declare id: number; declare title: string; declare description: string;
}

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
Assessment.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING(500), allowNull: false },
}, { tableName: 'assessments', sequelize, timestamps: false });
export { Assessment };
export const Question = QuestionModel(sequelize);
export const Answer = AnswerModel(sequelize);

Category.hasMany(Question, { foreignKey: "categoryId", as: "questions" });
Question.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

Assessment.hasMany(Question, { foreignKey: 'assessmentId', as: 'questions' });
Question.belongsTo(Assessment, { foreignKey: 'assessmentId', as: 'assessment' });
Course.belongsTo(Assessment, { foreignKey: 'assessmentId', as: 'assessment' });
Assessment.hasOne(Course, { foreignKey: 'assessmentId', as: 'course' });

Question.hasMany(Answer, { foreignKey: "questionId", as: "answers" });
Answer.belongsTo(Question, { foreignKey: "questionId", as: "question" });
