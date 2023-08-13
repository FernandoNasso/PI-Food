// // recipeReducer.js
// import { GET_RECIPES, CREATE_RECIPE, SET_SELECTED_RECIPE } from '../actions/actionTypes';

// const initialState = [];

// const recipeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_RECIPES:
//       console.log('Recipes received from backend:', action.payload);
//       return action.payload;
//     case CREATE_RECIPE:
//         return [...state, action.payload];
//     case SET_SELECTED_RECIPE:
//       return { ...state, selectedRecipe: action.payload };
//     default:
//       return state;
//   }
// };

// export default recipeReducer;

// recipeReducer.js
import {
  GET_RECIPES,
  CREATE_RECIPE,
  SEARCH_RECIPES,
  SET_DIET_FILTER,
  SET_ORIGIN_FILTER,
  SET_SORT_OPTION,
} from '../actions/actionTypes';

const initialState = {
  recipes: [],
  dietFilter: "",
  originFilter: "",
  sortOption: "",
  // ...otros estados
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
    // ...otros casos de reducción
    default:
      return state;
  }
};

export default recipeReducer;  