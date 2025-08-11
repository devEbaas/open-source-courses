"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentResult = void 0;
const sequelize_1 = require("sequelize");
class AssessmentResult extends sequelize_1.Model {
}
exports.AssessmentResult = AssessmentResult;
exports.default = (sequelize) => {
    AssessmentResult.init({
        id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        userId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
        assessmentId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
        score: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
        totalQuestions: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
        createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
    }, { tableName: 'assessment_results', sequelize, updatedAt: false });
    return AssessmentResult;
};
