const jwt = require('jsonwebtoken');
const loginService = require('../services/loginSevice');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await loginService.login(email, password);

    if (response.message) {
      return res.status(400).json(response);
    }

    const token = jwt.sign({ email }, JWT_SECRET);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  login,
};