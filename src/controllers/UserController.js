const UserService = require('../Services/UserService');
// const { authUserToken } = require('../middlewares/AuthMiddleware');

const newUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
  const addingUser = await UserService.newUser(displayName, email, password, image);
  if (!addingUser) {
    return res.status(409).json({ message: 'User already registered' });
  }
  if (addingUser.message) {
    return res.status(404).json(addingUser);
  }
  return res.status(201).json({ token: addingUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const getAllUsers = async (req, res) => {
  const { authorization } = req.headers;
  try {
  const allUsers = await UserService.getAllUsers(authorization);
  if (!allUsers) return res.status(401).json({ message: 'Expired or invalid token' });
  if (allUsers.message) return res.status(401).json(allUsers);
  return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  try {
  const userId = await UserService.getUserById(id, authorization);

  if (!userId) return res.status(404).json({ message: 'User does not exist' });
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  return res.status(200).json(userId.dataValues);
  } catch (error) {
    console.log(error.message, 'catch on controller');
    res.status(500).json({ message: 'Internal error' });
  }
};

const userDeleteSelf = async (req, res) => {
  const { authorization } = req.headers;
  try {
    const user = await UserService.userDeleteSelf(authorization);
    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
    if (user.message) return res.status(401).json(user);
    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
      return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  newUser,
  getAllUsers,
  getUserById,
  userDeleteSelf,
};