const jwt = require('jsonwebtoken');

const User = require('../models/user');

const secret = 'super-senha';

const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const ERROR_USER_AND_LOGIN = (res) => res.status(401).json({
    message: 'All fields must be filled',
  });
const ERROR_USER_DONT_EXISTS = (res) => res.status(401).json({
  message: 'Incorrect username or password',
});

// const SUCCESS_MESSAGE = (res) => res.status(200).json({
//   message: 'Login efetuado com sucesso',
// });

const login = async (req, res) => {
const { email, password } = req.body;

if (!email || !password) return ERROR_USER_AND_LOGIN(res);

console.log(email);

const user = await User.findUser(email);

if (!user || user.password !== password) return ERROR_USER_DONT_EXISTS(res);

const userWithOutPassword = {
  // eslint-disable-next-line no-underscore-dangle
  id: user._id,
  email: user.email,
};

const token = jwt.sign({ data: userWithOutPassword }, secret, jwtConfiguration);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};