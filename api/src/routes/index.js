const { Router } = require('express');
const getRecipeById = require('../controllers/getRecipeById');
const getAllDiets = require('../controllers/getAllDiets');
const postRecipe = require('../controllers/postRecipe');
const searchRecipeByName = require('../controllers/searchRecipeByName')

const router = Router();


router.get('/recipes/:id', getRecipeById);
router.get("/recipesName", searchRecipeByName);
router.post("/recipes", postRecipe);
router.get("/diets", getAllDiets);



module.exports = router;








