
import {
  GET_RECIPES,
  CREATE_RECIPE,
  SEARCH_RECIPES,
  SET_DIET_FILTER,
  SET_ORIGIN_FILTER,
  SET_SORT_OPTION,
  DELETE_RECIPE
} from '../actions/actionTypes';

const initialState = {
  recipes: [],
  dietFilter: "",
  originFilter: "",
  sortOption: "",
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case SET_DIET_FILTER:
      return {
        ...state,
        dietFilter: action.payload,
      };
    case SET_ORIGIN_FILTER:
      return {
        ...state,
        originFilter: action.payload,
      };
    case SET_SORT_OPTION:
      return {
        ...state,
        sortOption: action.payload,
      };
    case DELETE_RECIPE:
      return {  
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    default:
      return state;
  }
};

export default recipeReducer;  