const categoryService = require('../services/categoriesService');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await categoryService.createCategory(name);

    if (category.message) return res.status(409).json(category);

    return res.status(201).json(category);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await categoryService.getAllCategory();

    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
};