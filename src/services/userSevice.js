const { User } = require('../database/models');

const createUser = async ({ displayName, email, password, image }) => {
  const verifyUser = await User.findOne({ where: { email } });
  if (verifyUser) return { message: 'User already registered' };

  await User.create({ displayName, email, password, image });

  return true;
};

const getAllUser = async () => {
  const user = await User.findAll({ attributes: {
    exclude: ['password'],
  } });

  return user;
};

const getByIdUser = async (id) => {
  const user = await User.findOne({ where: { id },
    attributes: {
      exclude: ['password'],
    } });

  if (!user) return { message: 'User does not exist' };

  return user;
};

const deleteUser = async (email) => {
  const { dataValues: { id } } = await User.findOne({ where: { email } });

  await User.destroy({ where: { id } });

  return true;
};

module.exports = {
  createUser,
  getAllUser,
  getByIdUser,
  deleteUser,
};