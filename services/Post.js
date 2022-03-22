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

const update = async (id, title, content) => {
  await BlogPosts.update(
    { title, content },
    { where: { id } },
  );

  const updatedPost = await BlogPosts.findByPk(id, {
    include: {
      model: Categories, 
      as: 'categories',
      through: { attributes: [] },
    },
  });

return updatedPost;
};

const remove = async (id) => BlogPosts.destroy({ where: { id } });

const search = async (term) => BlogPosts.search(term);

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
  search,
};
