const { Router } = require('express');
const getRecipeById = require('../controllers/getRecipeById');
const getAllDiets = require('../controllers/getAllDiets');
const postRecipe = require('../controllers/postRecipe');
const searchRecipeByName = require('../controllers/searchRecipeByName');
const getAllRecipes = require('../controllers/getAllRecipes');
const deleteRecipe = require('../controllers/deleteRecipe'); // Importa el controlador para eliminar la receta

const router = Router();

router.get("/recipes", getAllRecipes);
router.get("/recipes/name", searchRecipeByName);
router.post("/recipes", postRecipe);
router.get("/diets", getAllDiets);
router.get("/recipes/:idRecipe", getRecipeById);

// Ruta para eliminar una receta por su ID
router.delete("/recipes/:recipeId", deleteRecipe);

module.exports = router;









