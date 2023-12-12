// Importaciones
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Variables de entorno
dotenv.config();

// Conexión a la base de datos
require('./config/database');

// Importar Routers
const userRouter = require('./routes/userRoutes.js'); 
const tasksRouter = require('./routes/tasksRoutes.js')

// Inicialización de Express
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); 

// Rutas
app.use('/api', userRouter);
app.use('/api', tasksRouter);

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor iniciado correctamente');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
