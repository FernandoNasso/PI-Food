import React from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css';

function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Bienvenido a la Aplicación de Recetas</h1>
        <p>Encuentra y crea tus recetas favoritas</p>
        <Link to="/home">
          <button className="landing-button">Ingresar</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
