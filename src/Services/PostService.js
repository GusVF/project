const { BlogPost, Category, PostCategory, User } = require('../models');
// const UserService = require('./UserService');
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

const getAllPostsAndUsers = async (token) => {
  try {
    if (!token) return ({ message: 'Token not found' });
    const allUsersPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
         { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    });
    validateToken(token);
    return allUsersPosts;
  } catch (error) {
    console.log(error.message);
  }
};

const getPostsById = async (token, id) => {
  try {
    const allUsersPosts = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
         { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    });
    validateToken(token);
    return allUsersPosts;
  } catch (error) {
    console.log(error.message);
  }
};

const updatePost = async (token, id, title, content) => {
   try {
    if (!token) return ({ message: 'Token not found' });
    const post = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
         { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    });
    // console.log(post.user.dataValues.id);
    if (!post) return ({ message: 'Post not found' });
    await post.update({ title, content });

    validateToken(token);
    console.log(token);
    return post;
   } catch (error) {
    console.log(error.message);
   }
};

module.exports = {
  newPost,
  getAllPostsAndUsers,
  getPostsById,
  updatePost,
};
