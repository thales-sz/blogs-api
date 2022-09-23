const { User } = require('../models');

const getUsers = async () => {
  const user = await User.findAll({});

  return user;
};

const createNewUser = async (newUser) => {
  await User.create({ ...newUser });
};

module.exports = {
  getUsers,
  createNewUser,
};