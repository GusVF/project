const { User } = require('../models');
const { generateToken, validateToken } = require('../utils/auth');

const validateUserFields = (displayName, email, password, image) => {
  if (!displayName || !email || !password || !image) {
   return ({ message: 'Verifique se todos os campos foram preenchidos da forma correta!' });
  }
};

const newUser = async (displayName, email, password, image) => {
  const invalidFields = validateUserFields(displayName, email, password, image);
  if (invalidFields) return invalidFields;
  try {
  const addingUser = await User.create({ displayName, email, password, image });

  const token = generateToken(addingUser.dataValues);
  return token;
    } catch (error) {
    console.log(error);
    return false;
    }
  };

const getAllUsers = async (token) => {
  if (!token) return ({ message: 'Token not found' });
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: 'password' },
    });
     validateToken(token);
     const userList = allUsers.map(({ dataValues }) => dataValues);
    return userList;
  } catch (error) {
    console.log(error.message, 'error on service');
  }
};
 
module.exports = {
  newUser,
  getAllUsers,
};