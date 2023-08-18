import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './detail.styles.css'; // Importa el CSS

function Detail() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchRecipe() {
      try {

        const apiUrl = `http://localhost:3001/recipes/${id}`;

        const response = await axios.get(apiUrl);
        const fetchedRecipe = response.data;
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    }

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Receta no encontrada</div>;
  }

  return (
    <div className="detail-container">
      <Link to="/home">
        <img
          src={require('../../assets/recipe-575434_1280.png')}
          alt="Home"
          className="home-icon"
        />
      </Link>
      <h1 className="detail-name">{recipe.name}</h1>
      <img className="detail-image" src={recipe.image} alt={recipe.name} />
      <p className="detail-summary">{recipe.summary}</p>
      <p className="detail-healthScore">Health Score: {recipe.healthScore}</p>
      <div>
        <h2 className="detail-diets">Diets:</h2>
        <ul className="detail-diets-list">
          {recipe.diets.map(diet => (
            <li key={diet} className="detail-list-item">{diet}</li>
          ))}
        </ul>
      </div>
      <div className="detail-steps">
        <h2 className="detail-steps">Steps:</h2>
        <div>
          {Array.isArray(recipe.steps) ? (
            <ol className="detail-steps-list">
              {recipe.steps.map((step, index) => (
                <li key={index} className="detail-list-item">{step}</li>
              ))}
            </ol>
          ) : (
            <p className="detail-list-item">{recipe.steps}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
