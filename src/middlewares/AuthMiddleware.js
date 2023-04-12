const UserService = require('../Services/UserService');
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
const authUserPostToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const validToken = validateToken(authorization);
    // console.log(validToken, 'token');
    const user = await UserService.getUserById(validToken.id, authorization);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
  next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  authUserToken,
  authUserPostToken,
};
