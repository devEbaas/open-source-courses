import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface AnswerAttributes {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, "id"> {}

export class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> implements AnswerAttributes {
  public id!: number;
  public questionId!: number;
  public text!: string;
  public isCorrect!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Answer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      questionId: {
        type: DataTypes.INTEGER,
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
    }
  );
  return Answer;
}