import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface AnswerAttributes {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, "id"> {}

export class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> implements AnswerAttributes {
  declare id: number;
  declare questionId: number;
  declare text: string;
  declare isCorrect: boolean;
}

export default (sequelize: Sequelize) => {
  Answer.init(
    {
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
    },
    {
      sequelize,
      tableName: "answers",
      timestamps: false,
    }
  );
  return Answer;
}