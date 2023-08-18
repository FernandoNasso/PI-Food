// dietActions.js
import axios from 'axios';
import { GET_DIETS } from '../actions/actionTypes';

export const getDiets = () => {
  return async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/diets");
    const diets = response.data;
    dispatch({ type: GET_DIETS, payload: diets });
    return diets; 
  } catch (error) {
    console.error('Error fetching diets:', error);
  } 
};
}

