"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentResultQuestion = exports.AssessmentResultQuestionInstance = exports.AssessmentResult = exports.AssessmentResultInstance = exports.User = exports.Answer = exports.Question = exports.Assessment = exports.AssessmentInstance = exports.Course = exports.Category = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Question_1 = __importDefault(require("./Question"));
const Answer_1 = __importDefault(require("./Answer"));
const Category_1 = __importDefault(require("./Category"));
const Course_1 = __importDefault(require("./Course"));
const Assessment_1 = __importDefault(require("./Assessment"));
const User_1 = __importDefault(require("./User"));
const AssessmentResult_1 = __importDefault(require("./AssessmentResult"));
const AssessmentResultQuestion_1 = __importDefault(require("./AssessmentResultQuestion"));
const DB_NAME = process.env.DB_NAME || 'courses';
const DB_USER = process.env.DB_USER || 'root';
// Compatibilidad: permitir DB_PASS o DB_PASSWORD
const DB_PASSWORD = process.env.DB_PASSWORD || process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
exports.sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
});
exports.Category = (0, Category_1.default)(exports.sequelize);
exports.Course = (0, Course_1.default)(exports.sequelize);
exports.AssessmentInstance = (0, Assessment_1.default)(exports.sequelize);
exports.Assessment = exports.AssessmentInstance;
exports.Question = (0, Question_1.default)(exports.sequelize);
exports.Answer = (0, Answer_1.default)(exports.sequelize);
exports.User = (0, User_1.default)(exports.sequelize);
exports.AssessmentResultInstance = (0, AssessmentResult_1.default)(exports.sequelize);
exports.AssessmentResult = exports.AssessmentResultInstance;
exports.AssessmentResultQuestionInstance = (0, AssessmentResultQuestion_1.default)(exports.sequelize);
exports.AssessmentResultQuestion = exports.AssessmentResultQuestionInstance;
exports.Category.hasMany(exports.Question, { foreignKey: "categoryId", as: "questions" });
exports.Question.belongsTo(exports.Category, { foreignKey: "categoryId", as: "category" });
exports.Course.hasOne(exports.AssessmentInstance, { foreignKey: 'courseId', as: 'assessment' });
exports.AssessmentInstance.belongsTo(exports.Course, { foreignKey: 'courseId', as: 'course' });
exports.AssessmentInstance.hasMany(exports.Question, { foreignKey: 'assessmentId', as: 'questions' });
exports.Question.belongsTo(exports.AssessmentInstance, { foreignKey: 'assessmentId', as: 'assessment' });
exports.Question.hasMany(exports.Answer, { foreignKey: "questionId", as: "answers" });
exports.Answer.belongsTo(exports.Question, { foreignKey: "questionId", as: "question" });
// User Results associations
exports.User.hasMany(exports.AssessmentResultInstance, { foreignKey: 'userId', as: 'results' });
exports.AssessmentResultInstance.belongsTo(exports.User, { foreignKey: 'userId', as: 'user' });
exports.AssessmentInstance.hasMany(exports.AssessmentResultInstance, { foreignKey: 'assessmentId', as: 'results' });
exports.AssessmentResultInstance.belongsTo(exports.AssessmentInstance, { foreignKey: 'assessmentId', as: 'assessment' });
exports.AssessmentResultInstance.hasMany(exports.AssessmentResultQuestionInstance, { foreignKey: 'assessmentResultId', as: 'detail' });
exports.AssessmentResultQuestionInstance.belongsTo(exports.AssessmentResultInstance, { foreignKey: 'assessmentResultId', as: 'result' });
exports.AssessmentResultQuestionInstance.belongsTo(exports.Question, { foreignKey: 'questionId', as: 'question' });
