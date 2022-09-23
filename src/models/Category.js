const CategoryModel = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: DataTypes.STRING,
  }, 
	{
		timestamps: false,
		underscored: true,
	});

  return CategoryTable;
};

module.exports = CategoryModel;

