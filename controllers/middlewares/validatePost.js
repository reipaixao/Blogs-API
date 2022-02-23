const catService = require('../../services/Categories');
const { BlogPosts } = require('../../models');
// const blogpost = require('../../models/blogpost');

const validateTitleAndContent = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }

  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }

  if (!categoryIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }

  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await catService.getAll();
  let allCategoriesIdsFound = true;

  categoryIds.forEach((id) => {
    if (!categories.some((category) => category.id === id)) {
      allCategoriesIdsFound = false;
    }
  });

  if (allCategoriesIdsFound === false) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

const validateUpdate = async (req, res, next) => {
  if (req.body.categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }

  const { id } = req.params;

  const post = await BlogPosts.findByPk(id);

  if (post.userId !== req.user.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

const validateDelete = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPosts.findByPk(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  next();
};

module.exports = {
  validateTitleAndContent,
  validateCategoryIds,
  validateUpdate,
  validateDelete,
};
