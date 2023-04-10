const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const { authUserToken } = require('../middlewares/AuthMiddleware');

const CategoryRouter = express.Router();
CategoryRouter.get(
  '/',
  authUserToken,
 CategoryController.getAllCategories,
 );

CategoryRouter.post(
  '/',
  authUserToken,
 CategoryController.validateCategoryFields,
 );

module.exports = CategoryRouter;
