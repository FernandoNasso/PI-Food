const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { API_KEY, URL_BASE } = process.env;
require('dotenv').config();

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params; 
    const recipeFromDB = await Recipe.findByPk(id); //búsqueda en la base de datos local utilizando Sequelize (Recipe.findByPk).
  
    if (recipeFromDB) { 
      return res.status(200).json(recipeFromDB); // Devolver la receta encontrada en la base de datos
    }
    // Si no encontramos recetas en la base de datos, hacemos una solicitud a la API
    const { data } = await axios.get(`${URL_BASE}${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`);
    // if (!data || data.code === 404) {
    //   return res.status(404).json({error: "No existe receta con ese ID"})
  
    const recipe = {
        id: data.id,
        name: data.title,
        image: data.image,
        summary: data.summary,
        healthScore: data.healthScore,
        steps: data.instructions,
        diets: data.diets,
      };
      return res.status(200).json({ recipe });
    
  } catch (error) {
    return res.status(500).json({ error: "No existe receta con ese ID" });
  } 
};

module.exports = getRecipeById;
