const PostService = require('../Services/PostService');

const newPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const addNewPost = await PostService.newPost(authorization, title, content, categoryIds);
    if (!addNewPost) return res.status(400).json(addNewPost);
    if (addNewPost.message) return res.status(400).json(addNewPost);
    return res.status(201).json(addNewPost.dataValues);
  } catch (error) {
    console.log(error.message, 'on PostController');
    res.status(500).json({ message: 'Internal service error' });
  }
};

const getAllPostsAndUsers = async (req, res) => {
  const { authorization } = req.headers;
  try {
    const allUsersPosts = await PostService.getAllPostsAndUsers(authorization);
    if (!authorization) return res.status(401).json({ message: 'No Token found' });
    return res.status(200).json(allUsersPosts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  newPost,
  getAllPostsAndUsers,
};