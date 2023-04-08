const UserService = require('../Services/UserService');

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

module.exports = {
  newUser,
};