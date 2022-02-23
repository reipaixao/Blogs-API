const rescue = require('express-rescue');

const Post = require('../services/Post');

const add = rescue(async (req, res) => {
  const { title, content } = req.body;

  const posts = await Post.add(title, content, req.user);
  res.status(201).json(posts);
});

const getAll = rescue(async (req, res) => {
  const posts = await Post.getAll();

  res.status(200).json(posts);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const post = await Post.getById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  res.status(200).json(post);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await Post.update(id, title, content);

  res.status(200).json(post);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;
  const post = await Post.getById(id);

  if (post.userId !== req.user.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await Post.remove(id);

  res.status(204).end();
});

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
