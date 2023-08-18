// dietReducer.js
import { GET_DIETS } from '../actions/actionTypes';

const initialState = [];

const dietReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIETS:
      return action.payload;
    default:
      return state;
  }
  
};
export default dietReducer;

