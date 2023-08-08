//Redux/reducers/index.js
import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import dietReducer from './dietReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  diets: dietReducer,
  searchResults: searchReducer,
});

export default rootReducer;

