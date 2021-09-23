const connect = require('./connection');

const emailExists = async (email) => {
  const db = await connect();
  const emailConfirm = await db.collection('users').findOne({ email });
  return emailConfirm !== null;
};

const registerUser = async (name, email, password) => {
  const db = await connect();
  const role = 'user';
  const { insertedId } = await db.collection('users')
    .insertOne({ name, email, password, role });
  
  return {
    _id: insertedId, name, email, role };
};

const findUser = async (email) => {
  const db = await connect();
  const userData = await db.collection('users').findOne({ email });
  return userData;
};

module.exports = {
  registerUser,
  findUser,
  emailExists,
};