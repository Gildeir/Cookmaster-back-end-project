const jwt = require('jsonwebtoken');

const User = require('../models/user');

const secret = 'super-senha';

const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const ERROR_USER_AND_LOGIN = (res) => res.status(401).json({
    message: 'É necessário usuário e senha para fazer login',
  });
const ERROR_USER_DONT_EXISTS = (res) => res.status(401).json({
  message: 'Usuário não existe ou senha inválida',
});

// const SUCCESS_MESSAGE = (res) => res.status(200).json({
//   message: 'Login efetuado com sucesso',
// });

module.exports = async (req, res) => {
const { name, password } = req.body;

if (!name || !password) return ERROR_USER_AND_LOGIN;

const user = await User.findUser(name);

const userWithOutPassword = {
  id: user.id,
  name: user.name,
};

if (!user || user.password !== password) return ERROR_USER_DONT_EXISTS;

const token = jwt.sign({ data: userWithOutPassword }, secret, jwtConfiguration);
  return res.status(200).json(token);
};