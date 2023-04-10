const { Category } = require('../models');
const { validateToken } = require('../utils/auth');

const validateCategoryFields = async (token, name) => {
  if (!token) return ({ message: 'Token not found' });
    try {
      const addCategory = await Category.create({ name });
       validateToken(token);
      return addCategory;
    } catch (error) {
      console.log(error.message, 'on CategoryService');
    }
};

const getAllCategories = async (token) => {
  if (!token) return ({ message: 'Token not found' });
  try {
    const allCategories = await Category.findAll();
    validateToken(token);
    return allCategories;
  } catch (error) {
    console.log(error.message, 'On CategoryService');
  }
};

module.exports = {
  validateCategoryFields,
  getAllCategories,
};