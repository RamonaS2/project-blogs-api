const { Category } = require('../database/models');

const createCategory = async (name) => {
  const verifyCategory = await Category.findAll({ where: { name } });
  if (verifyCategory.length > 0) return { message: 'Category already registered' };

  const { dataValues } = await Category.create({ name });

  return dataValues;
};

const getAllCategory = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  createCategory,
  getAllCategory,
};