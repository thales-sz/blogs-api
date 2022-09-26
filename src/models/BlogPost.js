const BlogPostModel = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: DataTypes.STRING,
		content: DataTypes.STRING,
		userId: DataTypes.STRING,
		published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, 
	{
		underscored: true,
	});

	 BlogPostTable.associate = (models) => {
	 	BlogPostTable.belongsTo(models.User, 
	 		{ foreignKey: 'userId', as: 'user'});
	 };

  return BlogPostTable;
};

module.exports = BlogPostModel;

