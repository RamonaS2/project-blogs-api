const { Router } = require('express');
const loginController = require('../controller/loginController');
const verifyLogin = require('../middlewares/verifyLogin');

const loginRoute = Router();

loginRoute.post('/', verifyLogin.verifyLogin, loginController.login);

module.exports = loginRoute;