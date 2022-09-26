const { BlogPost, PostCategory, User, Category } = require('../models');

const createNewPost = async ({ title, content, categoryIds }, id) => {
  const newPost = await BlogPost.create({
    title,
    userId: id,
    content,
  });

  await categoryIds.map((cateId) => PostCategory.create({
      postId: newPost.id,
      categoryId: cateId,
     }));

  return newPost;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return allPosts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
};
