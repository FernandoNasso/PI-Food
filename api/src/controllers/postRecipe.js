const { Recipe, Diets } = require('../db.js');

const postRecipe = async (req, res) => {
  try {
    const { name, summary, image, selectedDiets, healthScore, steps } = req.body;

    console.log('Received request to create recipe:', req.body);

    // Crea la nueva receta
    const newRecipe = await Recipe.create({ name, summary, image, healthScore, steps });
    
    let diets; // Esto puedes eliminarlo, no es necesario

    if (selectedDiets && selectedDiets.length > 0) {
      console.log('Selected diets:', selectedDiets);
      diets = await Diets.findAll({
        where: {
          id: selectedDiets, // Busca por IDs en lugar de nombres
        },
      });
    
      console.log('Diets found 1:', diets);
    
      await newRecipe.setDiets(diets); // Asocia las dietas con la receta
    
      // Agrega un console log para verificar las dietas asociadas con la receta
      const associatedDiets = await newRecipe.getDiets();
      console.log('Associated diets with recipe:', associatedDiets);
    }
 
    console.log('Diets associated with recipe:', diets);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Error creating recipe' });
  }
};

module.exports = postRecipe;








// const { Recipe, Diets } = require('../db'); // Importa los modelos Recipe y Diets desde db.js

// // Controlador para crear una nueva receta
// const postRecipe = async (req, res) => {
//   const { name, summary, healthScore, steps, image, selectedDiets } = req.body;

//   try {
//     // Crear la nueva receta en la base de datos
//     const newRecipe = await Recipe.create({
//       name,
//       summary,
//       healthScore,
//       steps,
//       image,
//     });

//     console.log('New recipe created:', newRecipe);

//     // Asociar las dietas seleccionadas con la receta creada
//     if (selectedDiets && selectedDiets.length > 0) {
//       console.log('Selected diets:', selectedDiets);

//       // Obtener objetos de dietas correspondientes a los nombres seleccionados
//       const dietObjects = await Diets.findAll({
//         where: { name: selectedDiets },
//       });

//       // Obtener solo los nombres de las dietas como un array
//       const selectedDietsArray = dietObjects.map(diet => diet.name);

//       console.log('Found diet objects:', dietObjects);
//       console.log('Selected diets array:', selectedDietsArray);

//       await newRecipe.addDiets(dietObjects);
//     }

//     return res.status(201).json(newRecipe);
//   } catch (error) {
//     console.error('Error creating recipe:', error);
//     return res.status(500).json({ error: 'Error creating recipe' });
//   }
// };

// module.exports = postRecipe;
