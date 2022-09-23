require('dotenv');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateJWT = (user) => {
  const payload = {
    user,
  };

  const config = {
    expiresIn: '5d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, JWT_SECRET, config);

  return token;
};

module.exports = generateJWT;