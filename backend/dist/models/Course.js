"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const sequelize_1 = require("sequelize");
class Course extends sequelize_1.Model {
}
exports.Course = Course;
exports.default = (sequelize) => {
    Course.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: false,
        },
    }, {
        tableName: 'courses_catalog',
        sequelize,
        timestamps: false,
    });
    return Course;
};
