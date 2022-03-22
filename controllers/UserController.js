const rescue = require('express-rescue');

const UserService = require('../services/User');

const add = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await UserService.add(displayName, email, password, image);

  res.status(201).json(user);
});

const getAll = rescue(async (_req, res) => {
  const getAllUsers = await UserService.getAll();
  res.status(200).json(getAllUsers);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const getUserById = await UserService.getById(id);
  
  if (!getUserById) return res.status(404).json({ message: 'User does not exist' });
  
  return res.status(200).json(getUserById);
});

const remove = rescue(async (req, res) => {
  const { id } = req.user;

  await UserService.remove(id);

  res.status(204).end();
});

module.exports = {
  add,
  getAll,
  getById,
  remove,
};
