import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../Redux/actions/recipeActions';
import Navbar from '../../Components/navbar/navbar.component';
import Cards from '../../Components/cards/cards.component';
import './home.styles.css';

const Home = () => {
  const dispatch = useDispatch();  // Inicializa el hook useDispatch para enviar acciones a Redux
  const recipes = useSelector((state) => state.recipes); // Obtenemos recetas del estado global usando Redux
  const [pagina, setPagina] = useState(1) // Inicializa el estado local 'pagina' con valor 1
  const [porPagina, setPorPagina] = useState([])  // Inicializa el estado local 'porPagina' con valor 9

  // const maximo = recipes.length / porPagina // Calcula el número máximo de páginas basado en la cantidad de recetas y recetas por página

  useEffect(() => { // Hook useEffect para ejecutar código cuando el componente se monta
    dispatch(getRecipes()); // Llama a la acción getRecipes para obtener recetas desde la API y almacenarlas en el estado global
  }, [dispatch]);

  useEffect(() => {
    const recipesPorPagina = 9;
    const startIdx = (pagina - 1) * recipesPorPagina;
    const endIdx = startIdx + recipesPorPagina;

    setPorPagina((recipes?.slice(startIdx, endIdx)))
  }, [pagina, recipes]);

  const handleNextPage = () => {
    setPagina((prevPage) =>
    prevPage + 1);
  }

  const handlePrevPage = () => {
    if (pagina > 1) {
      setPagina((pagina) => pagina - 1);
    }
  }

  return (
    <div>
      <Navbar />
      <Cards recipes={porPagina}/> 
      <button  
        onClick={handlePrevPage}>retrocede
      </button>
      <button 
        onClick={handleNextPage}>avanmzar
      </button>

    </div>
  );
};

export default Home;




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRecipes } from '../../Redux/actions/recipeActions';
// import Navbar from '../../Components/navbar/navbar.component';
// import Cards from '../../Components/cards/cards.component';
// import './home.styles.css';

// const Home = () => {
//   const dispatch = useDispatch();
//   const recipes = useSelector((state) => state.recipes);
//   const [pagina, setPagina] = useState(1);
//   const [porPagina, setPorPagina] = useState([]);

//   const [dietFilter, setDietFilter] = useState(''); // Estado para el filtro de dietas
//   const [originFilter, setOriginFilter] = useState(''); // Estado para el filtro de origen
//   const [sortOption, setSortOption] = useState(''); // Estado para la opción de ordenamiento

//   useEffect(() => {
//     dispatch(getRecipes());
//   }, [dispatch]);

//   useEffect(() => {
//     const recipesPorPagina = 9;
//     const startIdx = (pagina - 1) * recipesPorPagina;
//     const endIdx = startIdx + recipesPorPagina;

//     let filteredRecipes = recipes;

//     // Aplicar filtro por dieta
//     if (dietFilter) {
//       filteredRecipes = filteredRecipes.filter((recipe) => recipe.diets.includes(dietFilter));
//     }

//     // Aplicar filtro por origen
//     if (originFilter) {
//       filteredRecipes = filteredRecipes.filter((recipe) => recipe.origin === originFilter);
//     }

//     // Aplicar ordenamiento
//     if (sortOption === 'alphabetical') {
//       filteredRecipes = [...filteredRecipes].sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortOption === 'healthScore') {
//       filteredRecipes = [...filteredRecipes].sort((a, b) => b.healthScore - a.healthScore);
//     }

//     setPorPagina(filteredRecipes.slice(startIdx, endIdx));
//   }, [pagina, recipes, dietFilter, originFilter, sortOption]);

//   const handleNextPage = () => {
//     setPagina((prevPage) => prevPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (pagina > 1) {
//       setPagina((pagina) => pagina - 1);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="filter-options">
//         {/* Selectores de filtro y ordenamiento */}
//         <select value={dietFilter} onChange={(e) => setDietFilter(e.target.value)}>
//           <option value="">Todas las dietas</option>
//           <option value="vegetarian">Vegetariana</option>
//           <option value="vegan">Vegana</option>
//           <option value="gluten free">Libre de gluten</option>
//           {/* ... otras opciones de dieta ... */}
//         </select>

//         <select value={originFilter} onChange={(e) => setOriginFilter(e.target.value)}>
//           <option value="">Todos los orígenes</option>
//           <option value="api">API</option>
//           <option value="db">Base de datos</option>
//         </select>

//         <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
//           <option value="">Sin ordenar</option>
//           <option value="alphabetical">Alfabético</option>
//           <option value="healthScore">Saludable (mayor a menor)</option>
//         </select>
//       </div>
//       <Cards recipes={porPagina} />
//       <button onClick={handlePrevPage}>retrocede</button>
//       <button onClick={handleNextPage}>avanzar</button>
//     </div>
//   );
// };

// export default Home;
