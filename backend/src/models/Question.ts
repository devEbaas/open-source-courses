import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface QuestionAttributes {
  id: number;
  text: string;
  category?: string;
  difficulty?: string;
}

interface QuestionCreationAttributes
  extends Optional<QuestionAttributes, "id"> { }
  
  export class Question
    extends Model<QuestionAttributes, QuestionCreationAttributes>
    implements QuestionAttributes
  {
    public id!: number;
    public text!: string;
    public category?: string;
    public difficulty?: string;
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
    },
    {
      tableName: "questions",
      sequelize,
      timestamps: false,
    }
  );

  return Question;
};
