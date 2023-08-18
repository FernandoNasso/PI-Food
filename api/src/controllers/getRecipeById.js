const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { API_KEY, URL_BASE } = process.env;

const getRecipeById = async (req, res) => {
  const { idRecipe } = req.params;

  try {
    
    const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idRecipe);

    if (isUuid) {
      const recipe = await Recipe.findByPk(idRecipe, {
        include: [{ model: Diets, through: { attributes: [] } }],
      });

        const formattedRecipe = {
          id: recipe.id,
          name: recipe.name,
          image: recipe.image,
          summary: recipe.summary,
          healthScore: recipe.healthScore,
          steps: recipe.steps,
          diets: recipe.diets.map(diet => diet.name),
        };

        return res.json(formattedRecipe);
      } else {
      
      const response = await axios.get(`${URL_BASE}/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`);
      const apiRecipe = response.data;

    
    const formattedRecipe = {
      id: apiRecipe.id,
      name: apiRecipe.title,
      image: apiRecipe.image,
      summary: apiRecipe.summary.replace(/<\/?[^>]+(>|$)/g, ""), // Elimina etiquetas HTML del resumen
      healthScore: apiRecipe.healthScore,
      steps: apiRecipe.analyzedInstructions.length > 0 ? apiRecipe.analyzedInstructions[0].steps.map(step => step.step) : [],
      diets: [...new Set([...(apiRecipe.diets || []), ...(apiRecipe.vegetarian ? ['vegetarian'] : []), ...(apiRecipe.vegan ? ['vegan'] : []), ...(apiRecipe.glutenFree ? ['gluten free'] : [])])],    };

    return res.json(formattedRecipe);
    }
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = getRecipeById;
