const express = require('express');
const { validateJWT } = require('../middlewares/validJWT.middleware');
const { postController } = require('../controller');

const route = express.Router();

route.post('/', validateJWT, postController.createNewPost);

route.get('/', validateJWT, postController.getAllPosts);

route.get('/:id', validateJWT, postController.getPostById);

module.exports = route;