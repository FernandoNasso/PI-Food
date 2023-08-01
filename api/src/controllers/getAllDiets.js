const axios = require('axios');
const { Diets } = require('../db');
const { URL_BASE, API_KEY } = process.env;

// Función para obtener las dietas desde la API y guardarlas en la base de datos
const DietsFromAPI = async () => {
  try {
    const { data } = await axios.get(`${URL_BASE}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);

    // Obtenemos todas las dietas desde las recetas y las agrupamos sin duplicados
    const dietsFromRecipes = data.results.flatMap((recipe) => {
      const { vegetarian, vegan, glutenFree, diets } = recipe;
      const dietNames = new Set(diets || []);

      // Agregamos dietas adicionales populares según la documentación
      if (vegetarian) dietNames.add('vegetarian');
      if (vegan) dietNames.add('vegan');
      if (glutenFree) dietNames.add('gluten free');

      // Puedes agregar más dietas aquí según lo desees
      // Por ejemplo: dietNames.add('keto');
      //             dietNames.add('paleo');
      //             dietNames.add('low carb');
      //             ...

      return Array.from(dietNames);
    });

    // Creamos las instancias de Diets en la base de datos sin duplicados
    const uniqueDiets = Array.from(new Set(dietsFromRecipes));
    await Diets.bulkCreate(
      uniqueDiets.map((name) => ({ name })),
      { ignoreDuplicates: true }
    );

    console.log('Dietas precargadas en la base de datos');
  } catch (error) {
    console.error('Error al obtener las dietas desde la API:', error.message);
  }
};

// Endpoint para obtener todas las dietas
const getAllDiets = async (req, res) => {
  try {
    // Precargamos las dietas desde la API solo si no existen registros en la base de datos
    const dietsCount = await Diets.count();
    if (dietsCount === 0) {
      await DietsFromAPI();
    }

    // Obtenemos todas las dietas desde la base de datos y las devolvemos como respuesta
    const allDiets = await Diets.findAll({ raw: true });
    return res.status(200).json(allDiets);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllDiets;