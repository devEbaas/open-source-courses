"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const sequelize_1 = require("sequelize");
class Answer extends sequelize_1.Model {
}
exports.Answer = Answer;
exports.default = (sequelize) => {
    Answer.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        questionId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        text: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        isCorrect: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "answers",
        timestamps: false,
    });
    return Answer;
};
