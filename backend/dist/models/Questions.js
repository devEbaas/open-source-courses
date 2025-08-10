import { DataTypes, Model } from "sequelize";
export class Question extends Model {
    id;
    text;
    category;
    difficulty;
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
    }, {
        tableName: "questions",
        sequelize,
        timestamps: false,
    });
    return Question;
};
