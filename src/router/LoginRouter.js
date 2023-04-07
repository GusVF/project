const express = require('express');
const loginController = require('../controllers/Login');

const LoginRouter = express.Router();

LoginRouter.post('/', loginController.signin);

module.exports = LoginRouter;
