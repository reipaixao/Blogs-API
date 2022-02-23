const catService = require('../../services/Categories');

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

module.exports = {
  validateTitleAndContent,
  validateCategoryIds,
};