import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../../Redux/actions/recipeActions';
import { getDiets } from '../../Redux/actions/dietActions';

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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Dispatch para crear la receta
      await dispatch(createRecipe({ ...formData }));
      // Restablecer el formulario u otras acciones después de la creación
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
    <div>
      <h2>Create Recipe</h2>
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
          onChange={(e) => setFormData({ ...formData, healthScore: e.target.value })}
        />
        <label>Steps (comma-separated):</label>
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




// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createRecipe } from '../../Redux/actions/recipeActions';
// import './create-form.styles.css';

// function CreateForm({ diets }) {
//   const [formData, setFormData] = useState({ //los datos del form se guardan en el estado
//     name: '',
//     summary: '',
//     healthScore: 0,
//     steps: '', 
//     image: '',
//     selectedDiets: [],
//   });
//   console.log("estas so las dietas", diets); 

//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;    
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleDietsChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       selectedDiets: selectedOptions, // Corregido: envolver en corchetes para asegurarse de que siempre sea un array
//     }));
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('handleSubmit - formData antes:', formData);
    
//     try {
//       // Llamamos a la acción para crear la receta en el backend
//       await dispatch(createRecipe(formData));
//     } catch (error) {
//       console.error('Error creating recipe:', error);
//     }
//   };
  
//   return (
//     <div className="create-container">
//       <h1>Crear Nueva Receta</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Nombre:
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="input-field"
//           />
//         </label>
//         <label>
//           Resumen:
//           <input
//             type="text"
//             name="summary"
//             value={formData.summary}
//             onChange={handleChange}
//             className="input-field"
//           />
//         </label>
//         <label>
//           Nivel de Comida Saludable:
//           <input
//             type="number"
//             name="healthScore"
//             value={formData.healthScore}
//             onChange={handleChange}
//             className="input-field"
//           />
//         </label>
//         <label>
//         Pasos:
//         <textarea
//         type="text"
//           name="steps"
//           value={formData.steps} 
//           onChange={handleChange}
//           className="input-field"
//         />
//         </label>
//         <label>
//           Imagen:
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             className="input-field"
//           />
//         </label>
//         <label>
//           Tipos de dieta:
//           <select
//             name="selectedDiets"
//             multiple
//             value={formData.selectedDiets}
//             onChange={handleDietsChange}
//             required
//             className="select-diets"
//           >
//             {diets.map((diet) => (
//               <option key={diet.id} value={diet.name}>
//                 {diet.name}
//               </option>
//             ))}
//           </select>
//         </label>
//         <button type="submit" className="submit-button">
//           Crear Receta
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateForm;
