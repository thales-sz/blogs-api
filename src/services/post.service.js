const { BlogPost, PostCategory, User, Category, Sequelize } = require('../models');

const { Op } = Sequelize;

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

const updatePost = async (title, content, id) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const updated = await getPostById(id);
  return updated;
};

const deletePost = async (id) => {
  await BlogPost.destroy({
    where: { id },
  });
};

const getPostBySearchTerm = async (term) => {
  const posts = await BlogPost.findAll({
    where: { [Op.or]: [
      { content: { [Op.substring]: term } },
      { title: { [Op.substring]: term } },
    ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
      ],
  });
  return posts;
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostBySearchTerm,
};
