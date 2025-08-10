import { DataTypes, Sequelize, Model, Optional } from 'sequelize'

interface AssessmentAttributes {
  id: number
  name: string
  description: string
  courseId: number
}

interface AssessmentCreationAttributes extends Optional<AssessmentAttributes, 'id'> {}

export class Assessment extends Model<AssessmentAttributes, AssessmentCreationAttributes> implements AssessmentAttributes {
  declare id: number
  declare name: string
  declare description: string
  declare courseId: number
}

export default (sequelize: Sequelize) => {
  Assessment.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING(500), allowNull: false },
      courseId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    },
    { tableName: 'assessments', sequelize, timestamps: false }
  )
  return Assessment
}
