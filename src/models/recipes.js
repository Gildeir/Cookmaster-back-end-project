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

const update = async (id, name, ingredients, preparation) => {
  const db = await connect();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const updatedRecipes = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return (updatedRecipes);
};

const exclude = async (id) => {
 if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const recipeToExclude = await db.collection('recipes').findOne({ id: ObjectId(id) });
  await db.collection('recipes').deleteOne({ id: ObjectId(id) });
  return recipeToExclude;
};

const addingImageModel = async ({ _id, name, ingredients, preparation, userId }, image) => {
  if (!ObjectId.isValid(_id)) return false;
  const db = await connect();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(_id) }, { $set: { name, ingredients, preparation, userId, image } },
    );
  return { _id, name, ingredients, preparation, userId, image };
};

module.exports = {
  registerRecipes,
  getAll,
  getById,
  update,
  exclude,
  addingImageModel,
};