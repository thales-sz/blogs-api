const { categoriesService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: '"name" is required' });
  }

  const newCategory = await categoriesService.createCategory(name);

  return res.status(200).json(newCategory);
};

module.exports = {
  createCategory,
};