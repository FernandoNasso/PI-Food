import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../searchBar/searchBar.component';
import './navbar.styles.css';

function Navbar() { 
  const location = useLocation();
  // Verificar si la ruta actual es la del formulario de creación
  const isCreateFormRoute = location.pathname === '/form';

  return (
    <div className="navbar-container">
      <Link to="/home">
        <h1>Recetas App</h1>
      </Link>
      {!isCreateFormRoute && (
        <div>
          <SearchBar />
        </div>
      )}
      <Link to="/form">
      {!isCreateFormRoute && (
        <button>Crear Nueva Receta</button>
      )}
      </Link>
    </div>
  );
}


export default Navbar;

