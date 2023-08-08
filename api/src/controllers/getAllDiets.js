const axios = require('axios');
const { Diets } = require('../db');
const { URL_BASE, API_KEY } = process.env;

// Función para obtener las dietas desde la API
const getDietsFromAPI = async () => {
  try {
    const { data } = await axios.get(`${URL_BASE}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);

    // Obtenemos todas las dietas desde las recetas y las agrupamos sin duplicados
    const dietsFromRecipes = data.results.flatMap((recipe) => {
      const { vegetarian, vegan, glutenFree, diets } = recipe;
      const dietNames = new Set(diets || []);

      // Agregamos dietas adicionales populares según la documentación
      if (vegetarian) dietNames.add('vegetarian'); // si son true las agrega
      if (vegan) dietNames.add('vegan');
      if (glutenFree) dietNames.add('gluten free');

      return Array.from(dietNames);
    });

    return dietsFromRecipes;
  } catch (error) {
    throw new Error('Error al obtener las dietas desde la API');
  }
};

// Función para guardar las dietas en la base de datos
const saveDietsToDB = async (diets) => {
  try {
    // Creamos las instancias de Diets en la base de datos sin duplicados
    const uniqueDiets = Array.from(new Set(diets));
    await Diets.bulkCreate(
      uniqueDiets.map((name) => ({ name })),
      { ignoreDuplicates: true }
    );

    console.log('Dietas precargadas en la base de datos', uniqueDiets);
  } catch (error) {
    throw new Error('Error al guardar las dietas en la base de datos');
  }
};

// Endpoint para obtener todas las dietas
const getAllDiets = async (req, res) => {
  try {
    const dietsCount = await Diets.count();
    if (dietsCount === 0) {
      const dietsFromAPI = await getDietsFromAPI();
      console.log('Dietas obtenidas desde la API:', dietsFromAPI); // Agrega este console.log para verificar las dietas obtenidas
      await saveDietsToDB(dietsFromAPI);
    }

    const allDiets = await Diets.findAll({ raw: true });
    console.log('Dietas guardadas en la base de datos:', allDiets); // Agrega este console.log para verificar las dietas guardadas
    return res.status(200).json(allDiets);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllDiets;
