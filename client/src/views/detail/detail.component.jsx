import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Detail() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        // Construct the appropriate URL based on the type of ID
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.summary}</p>
      <p>Health Score: {recipe.healthScore}</p>
      <h2>Diets</h2>
      <ul>
        {recipe.diets.map(diet => (
          <li key={diet}>{diet}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <div>
        {Array.isArray(recipe.steps) ? (
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>{recipe.steps}</p>
        )}
      </div>
    </div>
  );
}

export default Detail;
