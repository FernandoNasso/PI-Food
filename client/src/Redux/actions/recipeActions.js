// recipeActions.js
import axios from 'axios';
import { GET_RECIPES, CREATE_RECIPE, SEARCH_RECIPES } from './actionTypes';

// Acción para obtener las recetas desde el backend
export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/recipes');
      const recipes = response.data;
      dispatch({ type: GET_RECIPES, payload: recipes });
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
};

// Acción para crear una nueva receta en el backend
export const createRecipe = (recipeData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/recipes', recipeData);
    const newRecipe = response.data;
    dispatch({ type: CREATE_RECIPE, payload: newRecipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
  }
};


export const searchRecipesByName = (query) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/recipes/name', {
      params: { name: query },
    });
    const recipes = response.data;
    console.log('Recetas encontradas en recipeActions:', recipes);
    dispatch({ type: SEARCH_RECIPES, payload: recipes });
  } catch (error) {
    console.error('Error searching recipes:', error);
  }
};
