const { validateToken } = require('../utils/auth');

const authUserToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    validateToken(authorization);
  next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

// const authControllerToken = (req, res, next) => {
//   try {
//     const { authorization } = req.headers;
//     validateToken(authorization);
//   next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Token not found' });
//   }
// };

module.exports = {
  authUserToken,
  // authControllerToken,
};
