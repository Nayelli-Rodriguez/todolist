const mongoose = require('mongoose');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/prueba').then(() => console.log("Conexión a MongoDB establecida"))
.catch(err => console.error("No se pudo conectar a MongoDB", err));