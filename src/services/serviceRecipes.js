const Model = require('../models/recipes');

const getRecipeById = async ({ id }) => {
  const recipe = await Model.getById(id);
  if (!recipe) {
    return {
      err: {
        code: 404,
        message: 'recipe not found',
      },
    };
  }
  return recipe;
};

const addingImageService = async (params, file) => {
  const recipeAlreadyExists = await getRecipeById(params);
  const imageName = `localhost:3000/${file.path}`;
  if (recipeAlreadyExists.err) return recipeAlreadyExists;

  const completeRecipe = await Model.addingImageModel(recipeAlreadyExists, imageName);
  return completeRecipe;
};

module.exports = {
  addingImageService,
  getRecipeById,

};