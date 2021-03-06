const jwt = require('../utils/jwt');
const { Users } = require('../models');

const add = async (displayName, email, password, image) => {
  await Users.create({
    displayName,
    email,
    password,
    image,
  });

  const token = jwt.sign({ email });
  console.log(token);

  return token;
};

const getAll = async () => {
  const getAllUsers = await Users.findAll();
  return getAllUsers;
};

const getById = async (id) => {
  const getUserById = await Users.findByPk(id);
  return getUserById;
};

const getUserByEmail = async (email) => {
  const userByEmail = await Users.findOne({ where: { email } });
  
  return userByEmail;
};

const remove = async (id) => Users.destroy({ where: { id } });

module.exports = {
  add,
  getAll,
  getById,
  remove,
  getUserByEmail,
};
