import { DataTypes, Sequelize, Model, Optional } from 'sequelize'

interface UserAttributes {
  id: number
  name: string
  email: string
  passwordHash: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number
  declare name: string
  declare email: string
  declare passwordHash: string
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'users', sequelize, timestamps: false }
  )
  return User
}
