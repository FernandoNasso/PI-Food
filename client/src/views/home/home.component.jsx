import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, setDietFilter, setOriginFilter, setSortOption } from '../../Redux/actions/recipeActions';
import Navbar from '../../Components/navbar/navbar.component';
import Cards from '../../Components/cards/cards.component';
import './home.styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState([]);

  const [dietFilter, setDietFilterLocal] = useState('');
  const [originFilter, setOriginFilterLocal] = useState('');
  const [sortOption, setSortOptionLocal] = useState('');

  // Define las opciones de dieta y origen
  const diets = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "vegetarian", "paleolithic", "primal", "whole 30"]; 
  const origins = ['db_recetas', 'api_recetas'];

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    const recipesPorPagina = 9;
    const startIdx = (pagina - 1) * recipesPorPagina;
    const endIdx = startIdx + recipesPorPagina;

    if (!recipes || !recipes.recipes) {
      return;
    }

    let filteredRecipes = [...recipes.recipes];

    // Aplicar filtro por dieta
    if (dietFilter) {
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.diets.includes(dietFilter));
    }

    // Aplicar filtro por origen
    if (originFilter) {
      const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      
      filteredRecipes = filteredRecipes.filter((recipe) => {
        if (originFilter === "db_recetas" && recipe.id && uuidPattern.test(recipe.id)) {
          return true; // Mis Recetas (con UUID)
        } else if (originFilter === "api_recetas" && recipe.id && !uuidPattern.test(recipe.id)) {
          return true; // Más Recetas (sin UUID)
        }
        
        return false;
      });
    }

    // Aplicar ordenamiento
    if (sortOption === 'alphabetical') {
      filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'healthScore') {
      filteredRecipes.sort((a, b) => b.healthScore - a.healthScore);
    }

    setPorPagina(filteredRecipes.slice(startIdx, endIdx));

  }, [pagina, recipes, dietFilter, originFilter, sortOption]);

  const handleNextPage = () => {
    setPagina((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (pagina > 1) {
      setPagina((pagina) => pagina - 1);
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
        {/* Selector de filtro de dieta */}
        <select value={dietFilter} onChange={(e) => handleDietFilterChange(e.target.value)}>
          <option value="">Selecciona un tipo de dieta</option>
          {diets.map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
  
        {/* Selector de filtro de origen */}
        <select value={originFilter} onChange={(e) => handleOriginFilterChange(e.target.value)}>
          <option value="">Selecciona un origen</option>
          {origins.map((origin) => (
            <option key={origin} value={origin}>
              {origin === "db_recetas" ? "Mis Recetas" : origin === "api_recetas" ? "Otras Recetas" : ""}
            </option>
          ))}
        </select>
  
        {/* Selector de ordenamiento */}
        <select value={sortOption} onChange={(e) => handleSortOptionChange(e.target.value)}>
          <option value="">Selecciona una opción de orden</option>
          <option value="alphabetical">Ordenar alfabéticamente</option>
          <option value="healthScore">Ordenar por puntuación de salud</option>
        </select>
      </div>
      <Cards recipes={porPagina} />
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={pagina === 1}>Retroceder</button>
        <div className="page-indicator">
          Página {pagina} de {totalPages}
        </div>
        <button onClick={handleNextPage} disabled={pagina === totalPages}>Avanzar</button>
      </div>
    </div>
  );
};

export default Home;
