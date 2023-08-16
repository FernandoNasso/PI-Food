import React from 'react';
import { useSelector } from 'react-redux';
import Cards from '../../Components/cards/cards.component';
import { Link } from 'react-router-dom';
import './searchResults.styles.css';

const SearchResults = () => {
  const searchResults = useSelector((state) => state.searchResults);

  return (
    <div className='search-results-container'>
      <Link className="link-To-Home" to="/home">
        <img
          src={require('../../assets/recipe-575434_1280.png')}
          alt="Home"
          className="home-icon"
        />
      </Link>
      <h2 className='search-results-title'>Search Results</h2>
      <Cards recipes={searchResults} />
    </div>
  );
};

export default SearchResults;

