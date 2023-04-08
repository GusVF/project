const { User } = require('../models');
const { generateToken } = require('../utils/auth');

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
  // console.log(addingUser.email, 'createEmail');
  // console.log(email,)
  const token = generateToken(addingUser.dataValues);
  return token;
    } catch (error) {
    console.log(error);
    return false;
    }
  };

module.exports = {
  newUser,
};