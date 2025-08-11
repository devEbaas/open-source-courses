import { DataTypes, Model } from 'sequelize';
export class User extends Model {
}
export default (sequelize) => {
    User.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
    }, { tableName: 'users', sequelize, timestamps: false });
    return User;
};
