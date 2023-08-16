const server = require('./src/app.js'); //importa el server desde App.js
const { conn } = require('./src/db.js'); //importa la instancia de sequelize y la coneccion con la base de datos.

const PORT = 3001 //define el nro de puerto en el q se ejecutará el servidor

// Syncing all the models at once.
conn.sync().then( async () => { //sincroniza los modelos de la db con las definiciones de modelo en el codigo
  server.listen(PORT, () => { //inicia el servidor para escuchar en el puerto indicado
    console.log(`Server listening on port: ${PORT}`); // eslint-disable-line no-console
  });
});
