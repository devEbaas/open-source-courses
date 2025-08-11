import { DataTypes, Model } from "sequelize";
export class Answer extends Model {
}
export default (sequelize) => {
    Answer.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        questionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "answers",
        timestamps: false,
    });
    return Answer;
};
