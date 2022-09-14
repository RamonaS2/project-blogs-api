const { Router } = require('express');
const categoryController = require('../controller/categoriesController');

const verify = require('../middlewares/verifyCategories');
const jwt = require('../jwt');

const categoryRoute = Router();

categoryRoute.post('/', jwt.verifyToken, verify.verifyCategories,
categoryController.createCategory);

categoryRoute.get('/', jwt.verifyToken, categoryController.getAllCategory);

module.exports = categoryRoute;