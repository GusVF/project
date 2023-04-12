const { validateToken } = require('../utils/auth');

const authUserToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
  }
  try {
     validateToken(authorization);
  next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  authUserToken,
};
