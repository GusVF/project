const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const configJWT = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, configJWT);
  return token;
};

const validateToken = (token) => {
  if (!token) return 'Missing token';
   const validToken = jwt.verify(token, JWT_SECRET);
  return validToken;
};

module.exports = {
  generateToken,
  validateToken,
};