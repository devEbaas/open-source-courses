import { DataTypes, Model } from "sequelize";
export default (sequelize) => {
    class Category extends Model {
    }
    Category.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: "categories",
        sequelize,
        timestamps: false,
    });
    return Category;
};
