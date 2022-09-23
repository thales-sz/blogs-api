const getUserByEmail = require('./login.service');
const userService = require('./user.service');
const categoriesService = require('./categories.service');

module.exports = {
  getUserByEmail,
  userService,
  categoriesService,
};