const userService = require('../services/userServices');

const ERROR_INVALID_ENTRIES = (res) => res.status(400).json({
  message: 'Invalid entries. Try again.',
});
const ERROR_EMAIL_EXISTS = (res) => res.status(409).json({
  message: 'Email already registered',
});

const createUsers = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = await userService.createUser(name, email, password, role);
    const dataCheck = userService.checkUserController(name, email, password, role);
    const emailCheck = userService.validateEmail(email);
    if (!dataCheck) return ERROR_INVALID_ENTRIES(res);
    if (!emailCheck) return ERROR_INVALID_ENTRIES(res);
    if (user === null) return ERROR_EMAIL_EXISTS(res);
    return res.status(201).json({ user });
};

module.exports = {
  createUsers,
};