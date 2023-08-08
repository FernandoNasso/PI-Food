// recipeReducer.js
import { GET_RECIPES } from '../actions/actionTypes';

const initialState = [];

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      console.log('Recipes received from backend:', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default recipeReducer;

  