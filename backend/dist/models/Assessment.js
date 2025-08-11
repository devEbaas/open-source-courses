"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assessment = void 0;
const sequelize_1 = require("sequelize");
class Assessment extends sequelize_1.Model {
}
exports.Assessment = Assessment;
exports.default = (sequelize) => {
    Assessment.init({
        id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        description: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
        courseId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    }, { tableName: 'assessments', sequelize, timestamps: false });
    return Assessment;
};
