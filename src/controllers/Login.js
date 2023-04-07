const LoginService = require('../Services/LoginService');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await LoginService.authenticate(email, password);

    if (login.message) return res.status(400).json(login);
    
    return res.status(200).json({ token: login });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
};

module.exports = {
  signin,
};
