const jwt = require('jsonwebtoken');
const userService = require('../services/userSevice');

const { JWT_SECRET } = process.env;

const createUser = async (req, res) => {
  try {
    const userDados = req.body;

    const user = await userService.createUser(userDados);

    if (user.message) return res.status(409).json(user);

    const token = jwt.sign({ email: userDados.email }, JWT_SECRET);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userService.getAllUser();

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getByIdUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getByIdUser(id);

    if (user.message) return res.status(404).json(user);

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization;

    const { email } = jwt.verify(token, JWT_SECRET);

    await userService.deleteUser(email);

    return res.status(204).end();
  } catch (err) {
    return res.status(204).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getByIdUser,
  deleteUser,
};