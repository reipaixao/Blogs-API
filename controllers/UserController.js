const rescue = require('express-rescue');

const UserService = require('../services/User');

const add = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await UserService.add(displayName, email, password, image);

  res.status(201).json(user);
});

module.exports = {
  add,
};
