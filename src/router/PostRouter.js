const express = require('express');
const PostController = require('../controllers/PostController');
const { authUserToken } = require('../middlewares/AuthMiddleware');
const { validatePostFields } = require('../middlewares/PostMiddleware');

const PostRouter = express.Router();

PostRouter.post('/', authUserToken, validatePostFields, PostController.newPost);

module.exports = PostRouter;