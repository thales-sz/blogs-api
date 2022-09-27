const Joi = require('joi');
const { postService, categoriesService } = require('../services');
const handleError = require('../utils/handleError');
const { getUserId } = require('../utils/getUserId');

const validateBody = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
});

const verifyValidCategory = async (categories) => {
  const response = await categoriesService.getAllCategories();
  const allCategories = response.map((c) => c.id);

  for (let i = 0; i < categories.length; i += 1) {
    if (!allCategories.includes(categories[i])) {
      return false;
    }
  }
  return true;
};

const createNewPost = async (req, res) => {
  const { categoryIds } = req.body;
  const { error } = validateBody.validate(req.body);

  if (error) {
    const err = handleError(error);
    return res.status(400).json(err);
  }

  const valid = await verifyValidCategory(categoryIds);
  
  if (!valid) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  const user = await getUserId(req.headers.authorization);

  const newPost = await postService.createNewPost(req.body, user.id);
  return res.status(201).json(newPost);
};

const getAllPosts = async (req, res) => {
  const allPosts = await postService.getAllPosts();
  return res.status(200).json(allPosts);
};

const getPostById = async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  if (post) {
    return res.status(200).json(post);
  }
  return res.status(404).json({ message: 'Post does not exist' });
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const user = await getUserId(req.headers.authorization);
  const post = await postService.getPostById(req.params.id);

  if (!(title && content)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (post.user.id === user.id) {
    const editedPost = await postService.updatePost(title, content, user.id);
    return res.status(200).json(editedPost);
  }
  return res.status(401).json({ message: 'Unauthorized user' });
};

const deletePost = async (req, res) => {
  const user = await getUserId(req.headers.authorization);
  const post = await postService.getPostById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (post.user.id === user.id) {
    await postService.deletePost(req.params.id);
    return res.sendStatus(204);
  }

  return res.status(401).json({ message: 'Unauthorized user' });
};

const getPostBySearchTerm = async (req, res) => {
  const { q } = req.query;

  const search = await postService.getPostBySearchTerm(q);

  res.status(200).json(search);
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostBySearchTerm,
};