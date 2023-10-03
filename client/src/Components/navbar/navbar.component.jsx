import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import SearchBar from '../searchBar/searchBar.component'; 
import './navbar.styles.css'; 

function Navbar() {
  const location = useLocation(); 
  const isCreateFormRoute = location.pathname === '/form';

  return (
    <div className="navbar-container">
      <div className="left-section">
        <Link className="link-To-Home" to="/home">
          <img src={require('../../assets/recipe-575434_1280.png')} alt="Home" className="home-icon" />
          <h1>Mi App de Recetas</h1>
        </Link>
      </div>

     
      <div className="searchBar">
        {!isCreateFormRoute && (
          <div>
            <SearchBar />
          </div>
        )}
      </div>

      <div className="right-section">
        <Link to="/create">
          {!isCreateFormRoute && (
            <button className="create-button">Crear Nueva Receta</button>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
