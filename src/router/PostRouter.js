const express = require('express');
const PostController = require('../controllers/PostController');
const { authUserToken } = require('../middlewares/AuthMiddleware');
const { validatePostFields } = require('../middlewares/PostMiddleware');

const PostRouter = express.Router();

PostRouter.post('/', authUserToken, validatePostFields, PostController.newPost);
PostRouter.get('/', authUserToken, PostController.getAllPostsAndUsers);

module.exports = PostRouter;
