const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { Op } = require("sequelize");
const { API_KEY, URL_BASE } = process.env;

const searchRecipeByName = async (req, res) => {
  try {
    // Obtenemos el nombre de la receta desde el query de la solicitud
    const { name } = req.query;

    // Buscamos las recetas en la base de datos local que coincidan con el nombre
    const recipesFromDB = await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: Diets, // Incluir la relación con Diets
    });

    // Buscamos las recetas en la API que coincidan con el nombre
    const { data } = await axios.get(
      `${URL_BASE}/complexSearch?apiKey=${API_KEY}&query=${name}&number=100&addRecipeInformation=true`
    );

    // Procesamos las recetas de la API
    const recipesFromAPI = data.results.map((recipe) => {
      const diets = [...recipe.diets];

  // Verificar y agregar las dietas adicionales
  if (recipe.vegetarian) {
    diets.push("vegetarian");
  }
  if (recipe.vegan) {
    diets.push("vegan");
  }
  if (recipe.glutenFree) {
    diets.push("gluten free");
  }

  return {
    id: recipe.id,
    name: recipe.title ?? 'Nombre no disponible',
    summary: recipe.summary ?? 'Resumen no disponible',
    healthScore: recipe.healthScore ?? 'Puntaje de salud no disponible',
    steps: recipe.analyzedInstructions?.[0]?.steps ?? [],
    image: recipe.image ?? '',
    diets: diets, 
  };
});

    // Combinamos las recetas de la base de datos local con las de la API
    const allRecipes = [...recipesFromDB, ...recipesFromAPI];

    if (allRecipes.length === 0) {
      // Si no se encontraron recetas, devolvemos un mensaje de error con un código de estado 404
      return res.status(404).json({ error: "No se encontraron recetas" });
    }

    // Devolvemos todas las recetas encontradas
    return res.status(200).json(allRecipes);
  } catch (error) {
    // Si se produce algún error durante el proceso, respondemos con un mensaje de error con un código de estado 500
    return res.status(500).json({ error: "Error al buscar las recetas" });
  }
};

module.exports = searchRecipeByName;
