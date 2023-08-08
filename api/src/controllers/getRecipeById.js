const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY, URL_BASE } = process.env;


const getRecipeById = async (req, res) => {
  try {
    const { idRecipe } = req.params;

    // Intentamos buscar la receta en la base de datos local por ID
    const recipeFromDB = await Recipe.findByPk(idRecipe);

    if (recipeFromDB) {
      // Si la receta se encuentra en la base de datos local, la devolvemos
      return res.status(200).json(recipeFromDB);
    } else {
      // Si la receta no está en la base de datos local, la buscamos en la API
      const { data } = await axios.get(
        `${URL_BASE}/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`
      );

      // Procesamos la receta de la API
      const recipeFromAPI = {
        id: data.id,
        name: data.title ?? 'Nombre no disponible',
        summary: data.summary ?? 'Resumen no disponible',
        healthScore: data.healthScore ?? 'Puntaje de salud no disponible',
        steps: data.analyzedInstructions?.[0]?.steps ?? [],
        image: data.image ?? '',
        diets: data.diets ?? [],
      };

      // Devolvemos la receta obtenida de la API
      return res.status(200).json(recipeFromAPI);
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la receta" });
  }
};

// Exporta la función para obtener el detalle de una receta por ID
module.exports = getRecipeById;