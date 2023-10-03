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
    dispatch({ type: SEARCH_RECIPES, payload: recipes });
  } catch (error) {
    console.error('Error searching recipes:', error);
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/recipes/${id}`);
    dispatch({ type: DELETE_RECIPE, payload: id }); 
    dispatch(getRecipes()); 
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
};

export const setDietFilter = (diet) => ({
  type: SET_DIET_FILTER,
  payload: diet,
});

export const setOriginFilter = (origin) => ({
  type: SET_ORIGIN_FILTER,
  payload: origin,
});

export const setSortOption = (option) => ({
  type: SET_SORT_OPTION,
  payload: option,
});