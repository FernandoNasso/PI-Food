import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../../Redux/actions/recipeActions';
import { getDiets } from '../../Redux/actions/dietActions';
import './create-form.styles.css';

const RecipeForm = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    image: '',
    diets: [],
    healthScore: 0,
    steps: '',
    selectedDiets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleDietChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      selectedDiets: selectedOptions,
    }));
  };

  const handleHealthScoreChange = (e) => {
    const score = Math.min(Math.max(0, e.target.value), 100); // Limita el valor entre 0 y 100
    setFormData((prevData) => ({
      ...prevData,
      healthScore: score,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch para crear la receta
      await dispatch(createRecipe({ ...formData }));
      // Restablecer el formulario después de la creación:
      setFormData({
        name: '',
        summary: '',
        image: '',
        diets: [],
        healthScore: 0,
        steps: '',
        selectedDiets: [],
      });
      // Mostrar un mensaje de éxito
      alert('Receta creada con éxito');
    } catch (error) {
      console.error('Error creating recipe:', error);
      // Mostrar un mensaje de error
      alert('Error al crear la receta');
    }
  };

  return (
    <div className="create-form-container">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"  
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <label>Summary:</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
        <label>Health Score:</label>
        <input
          type="number"
          name="healthScore"
          value={formData.healthScore}
          onChange={handleHealthScoreChange}
          min="0"
          max="100"
        />
        <label>Steps:</label>
        <input
          type="text"
          name="steps"
          value={formData.steps}
          onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
        />
        <label>Select Diets:</label>
        <select
          name="selectedDiets"
          value={formData.selectedDiets}
          onChange={handleDietChange}
          multiple
          required
        >
          {diets.map((diet) => (
            <option key={diet.id} value={diet.id}>
              {diet.name}
            </option>
          ))}
        </select>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;