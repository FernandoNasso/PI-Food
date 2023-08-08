// src/views/searchResults/searchResults.component.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Cards from '../../Components/cards/cards.component';
// import './searchResults.styles.css';

const SearchResults = () => {
  // Obtenemos las recetas buscadas desde el estado global
  const searchResults = useSelector((state) => state.searchResults);
  console.log('SSSearch Results:', searchResults); 
  return (
    <div>
      <h2>Search Results</h2>
      <Cards recipes={searchResults} />
    </div>
  );
};

export default SearchResults;
