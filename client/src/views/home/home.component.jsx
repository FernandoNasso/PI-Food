import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../Redux/actions/recipeActions';
import Navbar from '../../Components/navbar/navbar.component';
import Cards from '../../Components/cards/cards.component';
import Pagination from './pagination.component';
import './home.styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  // Lógica para obtener las recetas correspondientes a la página actual
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    console.log('Fetching recipes for page:', currentPage); // Verificar el valor de currentPage
    console.log('Recipes per page:', recipesPerPage); // Verificar el valor de recipesPerPage

    // Obtén las recetas cuando el componente se monta
    dispatch(getRecipes(currentPage, recipesPerPage)); // Pasar currentPage y recipesPerPage al backend
  }, [dispatch, currentPage, recipesPerPage]);

  console.log('Current recipes:', currentRecipes); // Verificar las recetas actuales antes de renderizar

  return (
    <div>
      <Navbar />
      <Cards recipes={currentRecipes} />
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;



