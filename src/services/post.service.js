const { BlogPost, PostCategory } = require('../models');

const createNewPost = async ({ title, content, categoryIds }) => {
  const newPost = await BlogPost.create({
    title,
    userId: 1,
    content,
  });

  await categoryIds.map((cateId) => PostCategory.create({
      postId: newPost.id,
      categoryId: cateId,
     }));

  return newPost;
};

module.exports = {
  createNewPost, 
};