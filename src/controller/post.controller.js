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

  const id = await getUserId(req.headers.authorization);

  const newPost = await postService.createNewPost(req.body, id);
  return res.status(201).json(newPost);
};

module.exports = {
  createNewPost,
};