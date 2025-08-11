import { DataTypes, Model } from "sequelize";
export class Question extends Model {
}
export default (sequelize) => {
    Question.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        assessmentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        tableName: "questions",
        sequelize,
        timestamps: false,
    });
    return Question;
};
