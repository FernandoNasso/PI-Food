import React, { useEffect, useState } from 'react'; // Agrega el import de useState
import { Provider } from 'react-redux';
import store from './Redux/store/store';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home/home.component'; 
import Detail from './views/detail/detail.component';
import Create from './views/create/create.component';
import Landing from './views/landing/landing.component';
import SearchResults from './views/searchResults/searchResults.component'; // Importamos el componente SearchResults
import { getRecipes } from './Redux/actions/recipeActions'; // Importamos la acción getRecipes
import { getDiets } from './Redux/actions/dietActions'; // Importamos la acción getDiets

function App() {
  const [recipes, setRecipes] = useState([]); // Agregamos estado local para recipes
  const [diets, setDiets] = useState([]); // Agregamos estado local para diets
  
  useEffect(() => {
    async function fetchData() {
      try {
        const recipesResponse = await store.dispatch(getRecipes());
        const dietsResponse = await store.dispatch(getDiets());

        setRecipes(recipesResponse);
        setDiets(dietsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home recipes={recipes} />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Create diets={diets} />} />
        <Route path='/search' element={<SearchResults />} />
      </Routes>
    </Provider>
  );
}

export default App;

