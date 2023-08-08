import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './detail.styles.css'; // Importa los estilos CSS específicos para esta vista';
import axios from 'axios';

function Detail() {
  const location = useLocation();
  const id = location.pathname.split('/').pop(); // Obtenemos el ID de la receta desde la URL

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((response) => {
        const data = response.data;
        setRecipe(data);
        setError(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        setError(true);
      });
  }, [id]);

  if (error) {
    return <div>Error al cargar la receta</div>;
  }

  if (!recipe) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detail-container">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <p>Resumen: {recipe.summary}</p>
      <p>Nivel de comida saludable: {recipe.healthScore}</p>
      <h2>Paso a Paso:</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))}
      </ol>
      <p>Tipos de dieta: {recipe.diets.join(', ')}</p>
    </div>
  );
}

export default Detail;


