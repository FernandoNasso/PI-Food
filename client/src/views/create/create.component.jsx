import React from 'react';
import RecipeForm from '../../Components/createForm/create-form.component.jsx'; // Importa el componente RecipeForm

function Create() {
  return (
    <div>
      <h1>Create a New Recipe</h1>
      <RecipeForm /> {/* Renderiza el componente RecipeForm */}
    </div>
  );
}

export default Create;


// // src/views/createForm/CreateForm.jsx
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createRecipe } from '../../Redux/actions/recipeActions'; // Importa la nueva acción para crear recetas

// const CreateForm = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: '',
//     summary: '',
//     healthScore: 0,
//     steps: '',
//     diets: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createRecipe(formData)); // Llama a la acción para crear recetas
//     // Limpia el formulario después del envío
//     setFormData({
//       name: '',
//       summary: '',
//       healthScore: 0,
//       steps: '',
//       diets: [],
//     });
//   };

//   return (
//     <div>
//       <h2>Create New Recipe</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Name:</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} />

//         {/* Agrega más campos aquí según tu modelo de datos */}
//         {/* Por ejemplo: summary, healthScore, steps, diets */}

//         <button type="submit">Create Recipe</button>
//       </form>
//     </div>
//   );
// };

// export default CreateForm;

//Esto era create.component.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDiets } from '../../Redux/actions/dietActions';
// import Navbar from '../../Components/navbar/navbar.component';
// import CreateForm from '../../Components/createForm/create-form.component'; // Importamos el componente CreateForm
// import './create.styles.css';

// function Create() {
//   const dispatch = useDispatch();
//   const diets = useSelector((state) => state.diets);

//   useEffect(() => {
//     console.log('useEffect - fetching diets...');
//     dispatch(getDiets());
//   }, [dispatch]);

//   return (
//     <div>
//       <Navbar />
//       <CreateForm diets={diets} /> {/* renderiza el componente CreateForm */}
//     </div>
//   );
// }

// export default Create;