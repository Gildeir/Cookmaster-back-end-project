const { getAll } = require('../controllers/recipes');
const { getRecipes } = require('../controllers/recipes');
const { createUsers } = require('../controllers/createUser');
const { login } = require('../controllers/login');
const { getById } = require('../controllers/recipes');
const { update } = require('../controllers/recipes');

module.exports = {
  getRecipes,
  createUsers,
  login,
  getAll,
  getById,
  update,
};