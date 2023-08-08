import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../Redux/actions/recipeActions';
import './create-form.styles.css';

function CreateForm({ diets }) {
  const [formData, setFormData] = useState({ 
    name: '',
    summary: '',
    healthScore: 0,
    steps: [],
    image: '',
    selectedDiets: [],
  });
  console.log("estas so las dietas", diets); 

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDietsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedDiets: selectedOptions,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí llamamos a la acción para crear la receta en el backend
    dispatch(createRecipe(formData));
  };

  return (
    <div className="create-container">
      <h1>Crear Nueva Receta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>
        <label>
          Resumen:
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <label>
          Nivel de Comida Saludable:
          <input
            type="number"
            name="healthScore"
            value={formData.healthScore}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <label>
          Pasos:
          <textarea
            name="steps"
            value={formData.steps.join('\n')} // Convertir el array en una cadena separada por saltos de línea
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <label>
          Imagen:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <label>
          Tipos de dieta:
          <select
            name="selectedDiets"
            multiple
            value={formData.selectedDiets}
            onChange={handleDietsChange}
            required
            className="select-diets"
          >
            {diets.map((diet) => (
              <option key={diet.id} value={diet.name}>
                {diet.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="submit-button">
          Crear Receta
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
