import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importa los hooks Link y useLocation de React Router
import SearchBar from '../searchBar/searchBar.component'; // Importa el componente SearchBar
import './navbar.styles.css'; // Importa el estilo aquí

function Navbar() {
  const location = useLocation(); // Obtiene la ubicación actual usando el hook useLocation
  const isCreateFormRoute = location.pathname === '/form'; // Verifica si la ruta actual es '/form'

  return (
    <div className="navbar-container">
      {/* Sección izquierda */}
      <div className="left-section">
        <Link className="link-To-Home" to="/home">
          {/* Enlace al inicio con un ícono y un título */}
          <img src={require('../../assets/recipe-575434_1280.png')} alt="Home" className="home-icon" />
          <h1>Mi App de Recetas</h1>
        </Link>
      </div>

      {/* Sección de la barra de búsqueda */}
      <div className="searchBar">
        {/* Renderiza la barra de búsqueda solo si no estamos en la ruta '/form' */}
        {!isCreateFormRoute && (
          <div>
            <SearchBar />
          </div>
        )}
      </div>

      {/* Sección derecha */}
      <div className="right-section">
        <Link to="/create">
          {/* Renderiza un botón "Crear Nueva Receta" solo si no estamos en la ruta '/form' */}
          {!isCreateFormRoute && (
            <button className="create-button">Crear Nueva Receta</button>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
