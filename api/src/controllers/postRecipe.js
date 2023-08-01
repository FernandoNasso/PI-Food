// Controlador para crear una nueva receta y relacionarla con tipos de dieta
const { Recipe, Diets, RecipeDiets } = require('../db');

const postRecipe = async (req, res) => {
  try {
    const {
      name,
      image,
      summary,
      healthScore,
      steps,
      diets, // Este será un array de nombres de los tipos de dieta solicitados
    } = req.body;

    // Verificar que se proporcionen todos los datos necesarios
    if (!name || !image || !summary || !healthScore || !steps || !diets) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar que los tipos de dieta existan en la base de datos
    const existingDiets = await Diets.findAll({
      where: { name: diets },
    });

    if (existingDiets.length !== diets.length) {
      return res.status(400).json({ error: "Uno o más tipos de dieta proporcionados no existen" });
    }

    // Crear la receta en la base de datos
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
    });

    // Relacionar la receta con los tipos de dieta
    await Promise.all(
      existingDiets.map((diet) =>
        RecipeDiets.create({
          recipeId: newRecipe.id,
          dietId: diet.id,
        })
      )
    );

    return res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postRecipe;