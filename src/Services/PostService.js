const { BlogPost, Category, PostCategory } = require('../models');
const { validateToken } = require('../utils/auth');

const getCategoryById = async (id) => {
  const categoryById = await Category
  .findByPk(id);
  if (!categoryById) throw new Error('one or more "categoryIds" not found');
  return categoryById;
};

const addPostCategories = async (postId, categoryIds) => {
  const postCategories = categoryIds.map((categoryId) => ({
    postId,
    categoryId,
  }));
  await PostCategory.bulkCreate(postCategories);
};

const newPost = async (token, title, content, categoryIds) => {
  try {
    const decodedToken = validateToken(token);
     await Promise.all(categoryIds.map((oneId) => getCategoryById(oneId)));
    const addNewPost = await BlogPost.create({ 
      title,
      content,
      userId: decodedToken.id,
      categoryIds,
      published: new Date(),
      updated: new Date(),
  });

  await addPostCategories(addNewPost.id, categoryIds);
    return addNewPost;
  } catch (error) {
    return ({ message: error.message });
  }
};

const getAllPostsAndUsers = async () => {
  
};

module.exports = {
  newPost,
  getAllPostsAndUsers,
};
