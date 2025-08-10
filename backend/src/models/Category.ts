import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface CategoryAttributes {
  id: number;
  name: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

export default (sequelize: Sequelize) => {
  class Category
    extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes
  {
    public id!: number;
    public name!: string;
  }

  Category.init(
    {
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
    },
    {
      tableName: "categories",
      sequelize,
      timestamps: false,
    }
  );

  return Category;
};
