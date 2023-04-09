const { validateToken } = require('../utils/auth');

const authToken = (req, res, next) => {
  try {
    const { authorization } = req.header;
   const validToken = validateToken(authorization);
   console.log(validToken);
  next();
  } catch (error) {
    return res.status(401).json({ message: 'Not Authorized!' });
  }
};

module.exports = {
  authToken,
};
