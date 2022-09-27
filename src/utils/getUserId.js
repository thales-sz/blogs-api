const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const { JWT_SECRET } = process.env;

const getUserId = async (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  const allUsers = await userService.getUsers();
  const theUser = allUsers.find((user) => user.email === decoded.user);
  return theUser;
};

module.exports = {
  getUserId,
};