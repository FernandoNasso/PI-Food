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
console.log("el dietReducer funciona bien")
export default dietReducer;

