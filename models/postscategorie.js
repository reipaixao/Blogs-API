module.exports = (sequelize, DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategorie', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  });
  
  return PostsCategorie;
};
