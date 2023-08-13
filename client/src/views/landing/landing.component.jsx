import React from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css';

function Landing() {
  return (
    <div className="landing-content">
      <h1>BIENVENIDO</h1>
      <h2>a tu aplicación de recetas</h2>
      <p>Encuentra y crea tus recetas favoritas</p>
      <Link to="/home">
      <button className="landing-button">ENTRAR</button>
      </Link>
    </div>
  );
}

export default Landing;


