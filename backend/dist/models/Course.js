import { DataTypes, Model } from 'sequelize';
export class Course extends Model {
}
export default (sequelize) => {
    Course.init({
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
    }, {
        tableName: 'courses_catalog',
        sequelize,
        timestamps: false,
    });
    return Course;
};
