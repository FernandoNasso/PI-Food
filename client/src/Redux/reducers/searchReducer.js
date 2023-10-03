import { SEARCH_RECIPES } from '../actions/actionTypes';

const initialState = [];

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RECIPES:
      return action.payload; // Actualiza el estado con las recetas que coinciden con la búsqueda por nombre
    default:
      return state;
  }
};

export default searchReducer;
