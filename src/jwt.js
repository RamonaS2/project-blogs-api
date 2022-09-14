const jwt = require('jsonwebtoken');
const { User } = require('./database/models');

const { JWT_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const { email } = jwt.verify(token, JWT_SECRET);
  const user = await User.findOne({ where: { email } });

  if (!user) throw Error;

  next();
} catch (err) {
  return res.status(401).json({ message: 'Expired or invalid token' });
} 
};

module.exports = { verifyToken };