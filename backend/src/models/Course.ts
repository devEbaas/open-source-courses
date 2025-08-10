import { DataTypes, Sequelize, Model, Optional } from 'sequelize'

interface CourseAttributes {
  id: number
  name: string
  description: string
  assessmentId?: number | null
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'assessmentId'> {}

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  declare id: number
  declare name: string
  declare description: string
  declare assessmentId?: number | null
}

export default (sequelize: Sequelize) => {
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      assessmentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      tableName: 'courses_catalog',
      sequelize,
      timestamps: false,
    }
  )
  return Course
}
