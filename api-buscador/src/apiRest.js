const app = require('./app');

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });

function startServer() {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  }
  
  if (require.main === module) {
    // El script se está ejecutando directamente, inicia el servidor
    startServer();
  } else {
    // El script se está requiriendo como un módulo, exporta la función de inicio del servidor
    module.exports = startServer;
  }