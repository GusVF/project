const express = require('express');
const UserController = require('../controllers/UserController');
const { validateName } = require('../middlewares/NameMiddleware');
const { validatePassword } = require('../middlewares/PasswordMiddleware');
const { validateEmail } = require('../middlewares/EmailMiddleware');
const { authUserToken } = require('../middlewares/AuthMiddleware');

const UserRouter = express.Router();

UserRouter.get('/', UserController.getAllUsers);
UserRouter.post(
  '/',
 validateName,
 validatePassword,
 validateEmail,
  UserController.newUser,
  );
UserRouter.get('/:id', authUserToken, UserController.getUserById);

module.exports = UserRouter;