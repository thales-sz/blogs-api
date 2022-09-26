const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory',
  {
    postId: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
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
        as: 'categories',
        through: PostCategoryTable,
        otherKey: 'id'
      });
    models.BlogPost.belongsToMany(models.Category, 
      {
        foreignKey: 'postId',
        as: 'blog_posts',
        through: PostCategoryTable,
        otherKey: 'id'
      });
	 };

  return PostCategoryTable;
};

module.exports = PostCategoryModel;

