const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const { authUserToken } = require('../middlewares/AuthMiddleware');

const CategoryRouter = express.Router();

CategoryRouter.post(
  '/',
  authUserToken,
 CategoryController.validateCategoryFields,
 );
CategoryRouter.get(
  '/',
  authUserToken,
 CategoryController.getAllCategories,
 );

module.exports = CategoryRouter;
