const Joi = require('joi');
const generateJWT = require('../utils/generateJWT');
const { userService } = require('../services');

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

module.exports = {
  createNewUser,
  getAllUsers,
};