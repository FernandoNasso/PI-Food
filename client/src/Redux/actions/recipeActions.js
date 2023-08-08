import axios from 'axios';
import { GET_RECIPES, CREATE_RECIPE, SEARCH_RECIPES } from './actionTypes';

// Acción para obtener las recetas desde el backend
export const getRecipes = (currentPage, recipesPerPage) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/recipes', {
        params: {
          currentPage: currentPage,
          recipesPerPage: recipesPerPage
        }
      });
      const recipes = response.data;
      dispatch({ type: GET_RECIPES, payload: recipes });
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
};

// Acción para crear una nueva receta en el backend
export const createRecipe = (formData) => async (dispatch) => {
  try {
    // Maneja el campo "steps" como un array antes de enviarlo al backend
    formData.steps = formData.steps.split('\n'); // los pasos se almacenan como un array separado por saltos de línea
    // Realizamos una solicitud POST al backend para crear la nueva receta
    const response = await axios.post("http://localhost:3001/recipes", formData);

    // Una vez creada la receta, podemos obtener la nueva receta del backend
    const newRecipe = response.data;

    // Luego, actualizamos el estado global con la nueva receta
    dispatch({ type: CREATE_RECIPE, payload: newRecipe });
  } catch (error) {
    console.error('fffError creating recipe:', error);
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



