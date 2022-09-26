const { categoriesService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: '"name" is required' });
  }

  const newCategory = await categoriesService.createCategory(name);

  return res.status(201).json(newCategory);
};

const getAllCategories = async (req, res) => {
  const allCategories = await categoriesService.getAllCategories();

  return res.status(200).json(allCategories);
};

module.exports = {
  createCategory,
  getAllCategories,
};