const Joi = require('joi');
const generateJWT = require('../utils/generateJWT');
const { userService } = require('../services');
const { getUserId } = require('../utils/getUserId');

const validateUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const createNewUser = async (req, res) => {
  const newUser = req.body;

  const { error } = validateUser.validate(newUser);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const alreadyExists = JSON.stringify(await userService.getUsers());

   if (JSON.parse(alreadyExists).find((user) => user.email === newUser.email)) { 
     return res.status(409).json({ message: 'User already registered' });
   }

  await userService.createNewUser(newUser);

  const token = generateJWT(newUser.email);

  return res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const user = await getUserId(req.headers.authorization);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  await userService.deleteUser(user.id);
  return res.sendStatus(204);
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  deleteUser,
};