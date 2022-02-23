const { Categories } = require('../models');

const add = async (name) => {
  const categories = await Categories.create({
    name,
  });
  return categories.dataValues;
};

const getAll = async () => {
  const categories = await Categories.findAll();
  return categories;
};

const getById = async (id) => {
  const category = await Categories.findByPk(id);
  
  return category;
};

module.exports = {
  add,
  getAll,
  getById,
};
