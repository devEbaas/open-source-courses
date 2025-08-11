import { DataTypes, Model } from 'sequelize';
export class Assessment extends Model {
}
export default (sequelize) => {
    Assessment.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING(500), allowNull: false },
        courseId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    }, { tableName: 'assessments', sequelize, timestamps: false });
    return Assessment;
};
