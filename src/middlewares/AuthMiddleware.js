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

module.exports = {
  authUserToken,
};
