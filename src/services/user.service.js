const { User } = require('../models');

const getUsers = async () => {
  const user = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  return user;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    attributes: {
      exclude: ['password'],
    },
    where: {
      id,
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
  getUserById,
};