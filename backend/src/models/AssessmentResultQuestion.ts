import { DataTypes, Sequelize, Model, Optional } from 'sequelize'

interface ARQAttributes {
  id: number
  assessmentResultId: number
  questionId: number
  questionText: string
  selectedAnswerId: number | null
  correctAnswerId: number
  isCorrect: boolean
}

interface ARQCreation extends Optional<ARQAttributes, 'id'> {}

export class AssessmentResultQuestion extends Model<ARQAttributes, ARQCreation> implements ARQAttributes {
  declare id: number
  declare assessmentResultId: number
  declare questionId: number
  declare questionText: string
  declare selectedAnswerId: number | null
  declare correctAnswerId: number
  declare isCorrect: boolean
}

export default (sequelize: Sequelize) => {
  AssessmentResultQuestion.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      assessmentResultId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      questionId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      questionText: { type: DataTypes.STRING(500), allowNull: false },
      selectedAnswerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      correctAnswerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      isCorrect: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    { tableName: 'assessment_result_questions', sequelize, timestamps: false }
  )
  return AssessmentResultQuestion
}
