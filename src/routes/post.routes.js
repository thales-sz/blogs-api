const express = require('express');
const { validateJWT } = require('../middlewares/validJWT.middleware');
const { postController } = require('../controller');

const route = express.Router();

route.post('/', validateJWT, postController.createNewPost);

route.get('/', validateJWT, postController.getAllPosts);

route.get('/search', validateJWT, postController.getPostBySearchTerm);

route.get('/:id', validateJWT, postController.getPostById);

route.put('/:id', validateJWT, postController.updatePost);

route.delete('/:id', validateJWT, postController.deletePost);

module.exports = route;