import { DataTypes, Model } from 'sequelize';
export class AssessmentResult extends Model {
}
export default (sequelize) => {
    AssessmentResult.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        assessmentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        score: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        totalQuestions: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    }, { tableName: 'assessment_results', sequelize, updatedAt: false });
    return AssessmentResult;
};
