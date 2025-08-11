import { DataTypes, Model } from 'sequelize';
export class AssessmentResultQuestion extends Model {
}
export default (sequelize) => {
    AssessmentResultQuestion.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        assessmentResultId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        questionId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        questionText: { type: DataTypes.STRING(500), allowNull: false },
        selectedAnswerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
        correctAnswerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        isCorrect: { type: DataTypes.BOOLEAN, allowNull: false },
    }, { tableName: 'assessment_result_questions', sequelize, timestamps: false });
    return AssessmentResultQuestion;
};
