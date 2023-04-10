const CategoryService = require('../Services/CategoryService');

const validateCategoryFields = async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;
  try {
    const categoryFields = await CategoryService.validateCategoryFields(authorization, name);
    if (!authorization) return res.status(401).json(categoryFields);

    if (!name) return res.status(400).json({ message: '"name" is required' });

  return res.status(201).json(categoryFields.dataValues);
  } catch (error) {
    console.log(error.message, 'on CategoryController');
    res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  validateCategoryFields,
};