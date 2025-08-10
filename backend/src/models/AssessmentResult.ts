import { DataTypes, Sequelize, Model, Optional } from 'sequelize'

interface AssessmentResultAttributes {
  id: number
  userId: number
  assessmentId: number
  score: number
  totalQuestions: number
  createdAt?: Date
}

interface AssessmentResultCreation extends Optional<AssessmentResultAttributes, 'id' | 'createdAt'> {}

export class AssessmentResult extends Model<AssessmentResultAttributes, AssessmentResultCreation> implements AssessmentResultAttributes {
  declare id: number
  declare userId: number
  declare assessmentId: number
  declare score: number
  declare totalQuestions: number
  declare createdAt?: Date
}

export default (sequelize: Sequelize) => {
  AssessmentResult.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      assessmentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      score: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      totalQuestions: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    { tableName: 'assessment_results', sequelize, updatedAt: false }
  )
  return AssessmentResult
}
