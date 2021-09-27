const Model = require('../models/recipes');
const Service = require('../services/serviceRecipes');

const WRONG_ID_FORMAT = (res) => res.status(404).json({
  message: 'recipe not found',
});

const getAll = async (_req, res) => {
  const allRecipes = await Model.getAll();
  console.log(allRecipes);
  return res.status(200).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipes = await Model.getById(id);
  if (!recipes) return WRONG_ID_FORMAT(res);
  return res.status(200).json(recipes);
};

const getRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
} 
  const id = req.user;
  const recipe = await Model.registerRecipes(name, ingredients, preparation, id);
  return res.status(201).json({ recipe });
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const updatedRecipes = await Model.update(id, name, ingredients, preparation);
    return res.status(200).json(updatedRecipes);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const removed = await Model.exclude(id);
  // if (!removed) return WRONG_ID_FORMAT(res);
  return res.status(204).json(removed);
};

const addingImage = async (req, res) => {
  console.log(req.file);
  const recipe = await Service.addingImageService(req.params, req.file);
  if (recipe.err) return res.status(recipe.err.code).json({ message: recipe.err.message });
  return res.status(200).json(recipe);
};

module.exports = { 
  getRecipes,
  getAll,
  getById,
  update,
  remove,
  addingImage,
};