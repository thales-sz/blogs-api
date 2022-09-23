const { User } = require('../models');

const getUsers = async () => {
  const user = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  return user;
};

const createNewUser = async (newUser) => {
  await User.create({ ...newUser });
};

module.exports = {
  getUsers,
  createNewUser,
};