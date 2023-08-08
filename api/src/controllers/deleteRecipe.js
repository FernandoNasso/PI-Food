// Controlador para eliminar una receta por su ID
const { Recipe } = require('../db');

const deleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    // Verificar si la receta existe en la base de datos
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }

    // Eliminar la receta de la base de datos
    await recipe.destroy();

    return res.status(200).json({ message: "Receta eliminada exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteRecipe;
