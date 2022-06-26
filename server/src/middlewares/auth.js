const jwt = require('jsonwebtoken');
const { User } = require('../models/user/user.mongo');

module.exports = async function (req, res, next) {
  const token = req.header('x-auth-token');


  if (!token) return res.status(401).send('Access denied. No token provided');

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(payload._id)
      .populate('roles')
      .select('-password');
    next();
  } catch (ex) {
    return res.status(400).send('Invalid token');
  }
};
