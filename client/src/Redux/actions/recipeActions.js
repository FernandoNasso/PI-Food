import axios from 'axios';
import {
  GET_RECIPES,
  CREATE_RECIPE,
  SEARCH_RECIPES,
  SET_DIET_FILTER,
  SET_ORIGIN_FILTER,
  SET_SORT_OPTION,
  DELETE_RECIPE,
} from './actionTypes';

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

//Acción para buscar recetas por nombre
export const searchRecipesByName = (query) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/recipes/name', {
      params: { name: query },
    });
    const recipes = response.data;
    dispatch({ type: SEARCH_RECIPES, payload: recipes });
  } catch (error) {
    console.error('Error searching recipes:', error);
  }
};

// Acción para eliminar una receta
export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/recipes/${id}`);
    dispatch({ type: DELETE_RECIPE, payload: id }); // Envía el ID de la receta eliminada
    dispatch(getRecipes()); // Actualiza la lista de recetas después de eliminar
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
};

// Acción para filtrar recetas por dieta
export const setDietFilter = (diet) => ({
  type: SET_DIET_FILTER,
  payload: diet,
});

// Acción para filtrar recetas por origen (api o db)
export const setOriginFilter = (origin) => ({
  type: SET_ORIGIN_FILTER,
  payload: origin,
});

// Acción para cambiar la opción de ordenamiento
export const setSortOption = (option) => ({
  type: SET_SORT_OPTION,
  payload: option,
});