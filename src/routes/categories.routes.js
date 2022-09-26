const express = require('express');
const { categoriesController } = require('../controller');
const { validateJWT } = require('../middlewares/validJWT.middleware');

const route = express.Router();

route.post('/', validateJWT, categoriesController.createCategory);

route.get('/', validateJWT, categoriesController.getAllCategories);

module.exports = route;