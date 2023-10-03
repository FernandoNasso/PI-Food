import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchRecipesByName } from '../../Redux/actions/recipeActions';
import './searchBar.styles.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchRecipesByName(searchQuery));
    setSearchQuery('');
    navigate('/search');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-bar-container">
        <input
          className="search-input"
          placeholder="Buscar Receta"
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

