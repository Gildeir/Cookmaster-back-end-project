const usersModel = require('../models/user');

const checkUserController = (name, password, email) => {
  if (!name || !password || !email) return false;
  return true;
};

// const emailCheker = (email) => {
//   const regexChecker = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
//   const test = regexChecker.test(email);
//   console.log(test);
//   if (!regexChecker.test(email)) return false;
//   return true;
// };

const validateEmail = (email) => {
  if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  return false;
};

const createUser = async (name, email, password, role) => {
// if (!user || user.password !== password) return ERROR_USER_DONT_EXISTS;

const emailExists = await usersModel.emailExists(email);
const isValidUserData = checkUserController(name, password, email);
const isValidEmail = validateEmail(email);
if (!isValidUserData) return false;
if (!isValidEmail) return false;
if (emailExists) return null;
const userCreated = await usersModel.registerUser(name, email, password, role);
return userCreated;
};

module.exports = {
  createUser,
  checkUserController,
  validateEmail,
};