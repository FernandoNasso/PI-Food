import React, { useEffect, useState } from 'react'; 
import { Provider } from 'react-redux';
import store from './Redux/store/store';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home/home.component'; 
import Detail from './views/detail/detail.component';
import Create from './views/create/create.component';
import Landing from './views/landing/landing.component';
import SearchResults from './views/searchResults/searchResults.component'; 
import { getRecipes } from './Redux/actions/recipeActions'; 

function App() {
  const [recipes, setRecipes] = useState([]); //Creamos un estado local 'recipes' con useState
  useEffect(() => {
    async function fetchData() {
      try {
        // Obtenemos recetas usando Redux
        const recipesResponse = await store.dispatch(getRecipes());
         // Actualizamos los estados locales con las respuestas
        setRecipes(recipesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Array de dependencias vacío indica que el efecto se ejecuta solo después del montaje inicial
  
  return (
    <Provider store={store}> 
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home recipes={recipes} />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<Create />} />
        <Route path='/search' element={<SearchResults />} />
      </Routes>
    </Provider>
  );
}

export default App;

