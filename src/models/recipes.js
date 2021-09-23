const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  // console.log(recipes);
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  return db.collection('recipes').findOne(ObjectId(id));
};

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const { insertedId } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  
  return { _id: insertedId, name, ingredients, preparation, userId };
};

module.exports = {
  registerRecipes,
  getAll,
  getById,
};