const jwt = require('jsonwebtoken');

require('dotenv/config');

const { JWT_SECRET } = process.env;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token === '') {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  try {
    jwt.verify(token, JWT_SECRET);
    
    next();
  } catch (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateJWT,
};