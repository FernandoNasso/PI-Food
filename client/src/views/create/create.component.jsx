import React from 'react';
import RecipeForm from '../../Components/createForm/create-form.component.jsx';
import { Link } from 'react-router-dom';
import './create.styles.css';

function Create() {
  return (
    <div className="create-container">
      <Link className="link-To-Home" to="/home">
        <img
          src={require('../../assets/recipe-575434_1280.png')}
          alt="Home"
          className="home-icon"
        />
      </Link>
      <h1 className="create-title">Create a New Recipe</h1>
      <RecipeForm />
    </div>
  );
}

export default Create;