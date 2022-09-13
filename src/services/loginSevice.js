const { User } = require('../database/models');

const login = async (email, password) => {
  const response = await User.findOne({ where: { email, password } });

  if (!response) {
    return { message: 'Invalid fields' };
  }

  return true;
};

module.exports = {
  login,
};