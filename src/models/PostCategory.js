const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory',
  {
    postId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: false,  primaryKey: true },
  }, 
	{
		timestamps: false,
		underscored: true,
    tableName: 'posts_categories'
	});

	 PostCategoryTable.associate = (models) => {
	 	models.Category.belongsToMany(models.BlogPost, 
      {
        foreignKey: 'categoryId',
        as: 'blog_posts',
        through: PostCategoryTable,
        otherKey: 'postId'
      });
    models.BlogPost.belongsToMany(models.Category, 
      {
        foreignKey: 'postId',
        as: 'categories',
        through: PostCategoryTable,
        otherKey: 'categoryId'
      });
	 };

  return PostCategoryTable;
};

module.exports = PostCategoryModel;

