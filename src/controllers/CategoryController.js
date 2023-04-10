const CategoryService = require('../Services/CategoryService');

const validateCategoryFields = async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;
  try {
    const categoryFields = await CategoryService.validateCategoryFields(authorization, name);
    if (authorization.message) return res.status(401).json(categoryFields);

    if (!name) return res.status(400).json({ message: '"name" is required' });

  return res.status(201).json(categoryFields.dataValues);
  } catch (error) {
    console.log(error.message, 'on CategoryController');
    res.status(500).json({ message: 'Internal error' });
  }
};

const getAllCategories = async (req, res) => {
  const { authorization } = req.headers;
  try {
    const allCategories = await CategoryService.getAllCategories(authorization);
    console.log(allCategories);
    if (!authorization) return res.status(401).json({ message: 'Expired or invalid token' });
    if (allCategories.message) return res.status(401).json(allCategories);
    return res.status(200).json(allCategories);
  } catch (error) {
    console.log(error.message, 'Error on Category Controller');
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  validateCategoryFields,
  getAllCategories,
};