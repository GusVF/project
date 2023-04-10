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

module.exports = {
  validateCategoryFields,
};