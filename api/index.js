const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = 3001

// Syncing all the models at once.
conn.sync().then( async () => {
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`); // eslint-disable-line no-console
  });
});
