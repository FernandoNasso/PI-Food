import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchRecipesByName } from '../../Redux/actions/recipeActions';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Obtenemos el historial de navegación

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llama a la acción searchRecipesByName para buscar recetas por nombre
    dispatch(searchRecipesByName(searchQuery));
    setSearchQuery('');
    // Navega a la página de resultados de búsqueda
    navigate('/search');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search Recipe"
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
