const { getAll } = require('../models/user');
const getPosts = require('../controllers/posts');
const { createUsers } = require('../controllers/createUser');
const login = require('../controllers/login');

module.exports = {
  getPosts,
  createUsers,
  login,
  getAll,
};