"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentResultQuestion = void 0;
const sequelize_1 = require("sequelize");
class AssessmentResultQuestion extends sequelize_1.Model {
}
exports.AssessmentResultQuestion = AssessmentResultQuestion;
exports.default = (sequelize) => {
    AssessmentResultQuestion.init({
        id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        assessmentResultId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
        questionId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
        questionText: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
        selectedAnswerId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: true },
        correctAnswerId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
        isCorrect: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
    }, { tableName: 'assessment_result_questions', sequelize, timestamps: false });
    return AssessmentResultQuestion;
};
