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

  const [notification, setShowNotification] = useState(null);


  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleDietChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
  
    const updatedSelectedDiets = formData.selectedDiets.includes(selectedOptions[0])
      ? formData.selectedDiets.filter((diet) => diet !== selectedOptions[0])
      : [...formData.selectedDiets, selectedOptions[0]];
  
    setFormData((prevData) => ({
      ...prevData,
      selectedDiets: updatedSelectedDiets,
    }));
  };  

  const handleHealthScoreChange = (e) => {
    const score = Math.min(Math.max(0, e.target.value), 100);
    setFormData((prevData) => ({
      ...prevData,
      healthScore: score,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
      setShowNotification({ type: 'success', message: 'Receta creada con éxito' });
    } catch (error) {
      console.error('Error creating recipe:', error);
      setShowNotification({ type: 'error', message: 'Error al crear la receta' });
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
          type="url"
          name="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
          title="Por favor, ingresa una URL válida para la imagen"
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
          required
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
        <button className="create-form-button" type="submit">Create Recipe</button>
      </form>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button className="close-button" onClick={() => setShowNotification(false)}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeForm;