const express = require('express');
const userController = require('../controller');

const route = express.Router();

route.post('/', userController.createNewUser);

module.exports = route;