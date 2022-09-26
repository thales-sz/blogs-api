const { BlogPost, PostCategory } = require('../models');

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

module.exports = {
  createNewPost, 
};