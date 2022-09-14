const { Router } = require('express');
const postController = require('../controller/postController');

const verifyPost = require('../middlewares/verifyPost');
const jwt = require('../jwt');

const postRoute = Router();

postRoute.post('/', jwt.verifyToken, verifyPost.verifyPost, postController.create);

postRoute.get('/', jwt.verifyToken, postController.getAll);

postRoute.get('/:id', jwt.verifyToken, postController.getById);

postRoute.put('/:id', jwt.verifyToken, verifyPost.verifyPost, postController.update);

postRoute.delete('/:id', jwt.verifyToken, postController.remove);

module.exports = postRoute;