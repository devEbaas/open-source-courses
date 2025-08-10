import { DataTypes, Sequelize, Model, Optional } from 'sequelize'

interface CourseAttributes {
  id: number
  name: string
  description: string
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  declare id: number
  declare name: string
  declare description: string
}

export default (sequelize: Sequelize) => {
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
