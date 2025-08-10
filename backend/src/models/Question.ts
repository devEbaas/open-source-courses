import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface QuestionAttributes {
  id: number;
  text: string;
  categoryId: number;
}

interface QuestionCreationAttributes
  extends Optional<QuestionAttributes, "id"> { }
  
  export class Question
    extends Model<QuestionAttributes, QuestionCreationAttributes>
    implements QuestionAttributes
  {
    declare id: number;
    declare text: string;
    declare categoryId: number;
  }

export default (sequelize: Sequelize) => {
  Question.init(
    {
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
    },
    {
      tableName: "questions",
      sequelize,
      timestamps: false,
    }
  );

  return Question;
};
