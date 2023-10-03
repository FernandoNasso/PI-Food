import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, setDietFilter, setOriginFilter, setSortOption } from '../../Redux/actions/recipeActions';
import Navbar from '../../Components/navbar/navbar.component';
import Cards from '../../Components/cards/cards.component';
import './home.styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [pag, setPag] = useState(1);
  const [perPag, setPerPag] = useState([]);

  const [dietFilter, setDietFilterLocal] = useState('');
  const [originFilter, setOriginFilterLocal] = useState('');
  const [sortOption, setSortOptionLocal] = useState('');

  // Define las opciones de dieta y origen
  const diets = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "vegetarian", "paleolithic", "primal", "whole 30"]; 
  const origins = ['db_recipes', 'api_recipes'];

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    const recipesPerPag = 9;
    const startIdx = (pag - 1) * recipesPerPag;
    const endIdx = startIdx + recipesPerPag;

    if (!recipes || !recipes.recipes) {
      return;
    }

    let filteredRecipes = [...recipes.recipes];  // Creamos una copia de las recetas para filtrar y ordenar

    if (dietFilter) {
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.diets.includes(dietFilter));
    }

    if (originFilter) {
      const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      
      filteredRecipes = filteredRecipes.filter((recipe) => {
        if (originFilter === "db_recipes" && recipe.id && uuidPattern.test(recipe.id)) {
          return true; 
        } else if (originFilter === "api_recipes" && recipe.id && !uuidPattern.test(recipe.id)) {
          return true; 
        }
        
        return false;
      });
    }

    if (sortOption === 'alphabetical') {
      filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'reverseAlphabetical') {
      filteredRecipes.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'healthScore') {
      filteredRecipes.sort((a, b) => b.healthScore - a.healthScore);
    } else if (sortOption === 'reverseHealthScore') {
      filteredRecipes.sort((a, b) => a.healthScore - b.healthScore);
    }
    

    setPerPag(filteredRecipes.slice(startIdx, endIdx));

  }, [pag, recipes, dietFilter, originFilter, sortOption]);

  const handleNextPage = () => {
    setPag((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (pag > 1) {
      setPag((pag) => pag - 1);
    }
  };

  const handleDietFilterChange = (value) => {
    setDietFilterLocal(value);
    dispatch(setDietFilter(value));
  };

  const handleOriginFilterChange = (value) => {
    setOriginFilterLocal(value);
    dispatch(setOriginFilter(value));
  };

  const handleSortOptionChange = (value) => {
    setSortOptionLocal(value);
    dispatch(setSortOption(value));
  };

  const totalPages = Math.ceil((recipes.recipes && recipes.recipes.length) / 9);

  return (
    <div className="home-container"> 
      <Navbar />
      <div className="filter-options">
        <select value={dietFilter} onChange={(e) => handleDietFilterChange(e.target.value)}>
          <option value="">Selecciona un tipo de dieta</option>
          {diets.map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
  
        <select value={originFilter} onChange={(e) => handleOriginFilterChange(e.target.value)}>
          <option value="">Selecciona un origen</option>
          {origins.map((origin) => (
            <option key={origin} value={origin}>
              {origin === "db_recipes" ? "Mis Recetas" : origin === "api_recipes" ? "Otras Recetas" : ""}
            </option>
          ))}
        </select>
  
        <select value={sortOption} onChange={(e) => handleSortOptionChange(e.target.value)}>
        <option value="">Selecciona una opción de orden</option>
        <option value="alphabetical">Order (A-Z)</option>
        <option value="reverseAlphabetical">Order (Z-A)</option>
        <option value="healthScore">Healthscore (Max-Min)</option>
        <option value="reverseHealthScore">Healthscore (Min-Max)</option>
        </select>
      </div>
      <Cards recipes={perPag} />
      <div className="pagination">
        <button className="pagination-button" onClick={handlePrevPage} disabled={pag === 1}>Retroceder</button>
        <div className="page-indicator">
          Página {pag} de {totalPages}
        </div>
        <button className="pagination-button" onClick={handleNextPage} disabled={pag === totalPages}>Avanzar</button>
      </div>
    </div>
  );
};

export default Home;
