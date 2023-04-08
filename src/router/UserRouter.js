const express = require('express');
const UserController = require('../controllers/UserController');
const { validateName } = require('../middlewares/NameMiddleware');
const { validatePassword } = require('../middlewares/PasswordMiddleware');
const { validateEmail } = require('../middlewares/EmailMiddleware');

const UserRouter = express.Router();

UserRouter.post(
  '/',
 validateName,
 validatePassword,
 validateEmail,
  UserController.newUser,
  );

module.exports = UserRouter;