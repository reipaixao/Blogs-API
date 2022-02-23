const { BlogPosts, Users, Categories } = require('../models');

const add = async (title, content, user) => {
  const userId = user.id;

  const posts = await BlogPosts.create({ title, content, userId });

  return {
    id: posts.id,
    title: posts.title,
    content: posts.content,
    userId,
  };
};

const getAll = async () => {
  const posts = await BlogPosts.findAll({
    attributes: { exclude: ['UserId'] },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPosts.findByPk(id, {
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

module.exports = {
  add,
  getAll,
  getById,
};
