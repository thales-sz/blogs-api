const express = require('express');
const loginController = require('../controller');

const route = express.Router();

route.post('/', loginController.login);

module.exports = route;