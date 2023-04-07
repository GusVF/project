const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const configJWT = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, configJWT);
  console.log(token);
  return token;
};

module.exports = {
  generateToken,
};