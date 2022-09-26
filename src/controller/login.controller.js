const loginService = require('../services');
const generateJWT = require('../utils/generateJWT');

const isBodyValid = (email, password) => email && password;

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!isBodyValid(email, password)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await loginService.getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = generateJWT(email);

  return res.status(200).json({ token });
};

module.exports = { login };