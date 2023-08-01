const axios = require('axios');
const { Recipe, Diets } = require('../db');
const { API_KEY, URL_BASE } = process.env;
const { Op } = require('sequelize');


const searchRecipeByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Buscamos las recetas por nombre en la base de datos
    const recipesFromDB = await Recipe.findAll({
        where: { name: { [Op.iLike]: `%${name}%` }},
           include: Diets,
        });

    if (recipesFromDB.length > 0) {
      // Si encontramos recetas en la base de datos, las devolvemos
      return res.status(200).json(recipesFromDB);
    }

    // Si no encontramos recetas en la base de datos, hacemos una solicitud a la API
    const response = await axios.get(`${URL_BASE}/complexSearch?query=${name}&apiKey=${API_KEY}`);
    
    // Si la API responde correctamente, creamos y guardamos las recetas en la base de datos
    const newRecipes = await Promise.all(
      response.data.results.map((data) => {
        return {
          id: data.id,
          name: data.title,
          image: data.image,
          summary: data.summary,
          healthScore: data.healthScore,
          steps: data.analyzedInstructions[0] ? data.analyzedInstructions[0].steps.map((step) => step.step) : [],
          diets: data.diets,
        };
      })
    );
    if (newRecipes.length > 0) {
      return res.status(200).json({ recipes: newRecipes });
    }
  
      // Si no se encontraron recetas en la API ni en la base de datos, devolvemos un mensaje adecuado
      return res.status(404).json({ error: "No se encontraron recetas con ese nombre" });
  
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = searchRecipeByName;