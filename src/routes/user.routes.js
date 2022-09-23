const express = require('express');
const { userController } = require('../controller');
const { validateJWT } = require('../middlewares/validJWT.middleware');

const route = express.Router();

route.post('/', userController.createNewUser);

route.get('/', validateJWT, userController.getAllUsers);

route.get('/:id', validateJWT, userController.getUserById);

module.exports = route;