const { Router } = require('express');
const userController = require('../controller/userController');

const verifyUser = require('../middlewares/verifyUser');
const jwt = require('../jwt');

const userRoute = Router();

userRoute.post('/', verifyUser.verifyUser, userController.createUser);

userRoute.get('/', jwt.verifyToken, userController.getAllUser);

userRoute.get('/:id', jwt.verifyToken, userController.getByIdUser);

userRoute.delete('/me', jwt.verifyToken, userController.deleteUser);

module.exports = userRoute;