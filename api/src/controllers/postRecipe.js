const { Recipe, Diets } = require('../db'); // Importa los modelos Recipe y Diets desde db.js

// Controlador para crear una nueva receta
const postRecipe = async (req, res) => {
  const { name, summary, healthScore, steps, image, selectedDiets } = req.body; // Obtiene los datos del formulario enviados desde el cliente

  try {

    const stepsArray = Array.isArray(steps) ? steps : [steps];
    // Crea la nueva receta en la base de datos utilizando el modelo Recipe
    const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      steps: stepsArray,
      image,
    });

    // Asocia las dietas seleccionadas con la receta creada
    if (selectedDiets && selectedDiets.length > 0) {
      const diets = await Diets.findAll({
        where: { name: selectedDiets }, // Busca las dietas seleccionadas en la base de datos
      });

      // Asocia las dietas encontradas con la receta creada
      await newRecipe.addDiets(diets);
    }

    // Retorna la nueva receta creada como respuesta
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    return res.status(500).json({ error: 'Error creating recipepepe' });
  }
};

module.exports = postRecipe;
