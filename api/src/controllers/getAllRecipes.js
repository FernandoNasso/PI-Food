const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY, URL_BASE } = process.env;

const getAllRecipes = async (req, res) => {
  try {
    const { currentPage, recipesPerPage } = req.query; // Obtenemos los parámetros de paginación

    // Obtenemos todas las recetas desde la db local usando Sequelize
    const recipesFromDB = await Recipe.findAll();

    // Obtenemos 100 recetas desde la API
    const { data } = await axios.get(`${URL_BASE}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)

    // Procesamos las recetas de la API 
    const recipesFromAPI = data.results.map((recipe) => {
      const diets = [...recipe.diets];

      // Verificar si no existe y luego agregar a la lista de diets
      const addToDiets = (diet) => {
        if (!diets.includes(diet)) {
          diets.push(diet);
        }
      };

      if (recipe.vegetarian) {
        addToDiets("vegetarian");
      }

      if (recipe.vegan) {
        addToDiets("vegan");
      }

      if (recipe.glutenFree) {
        addToDiets("gluten free");
      }

      return {
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        healthScore: recipe.healthScore,
        diets: diets,
      };
    });

    // Combinamos las recetas de la base de datos con las recetas de la API
    const allRecipes = [...recipesFromDB, ...recipesFromAPI];

    // Si se proporcionan parámetros de paginación, aplicamos la lógica de paginación
    if (currentPage && recipesPerPage) {
      const offset = (currentPage - 1) * recipesPerPage;
      const paginatedRecipes = allRecipes.slice(offset, offset + parseInt(recipesPerPage));
      return res.status(200).json(paginatedRecipes);
    } else {
      return res.status(200).json(allRecipes);
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las recetas" });
  }
};

module.exports = getAllRecipes;
