const mongoose = require('mongoose');
// Conexión a la base de datos
require('../config/database.js');
const User = require('../models/User.js');
const Task = require('../models/Task.js');

async function createTasks() {
    try {
        const user = await User.findOne({ email: 'nayelli@gmail.com' }); 

        if (!user) {
            console.error('Usuario no encontrado');
            return;
        }

        const tasksToCreate = [
            {
                title: "Tarea 1",
                description: "Mi tarea 1",
                status: 'IN PROGRESS',
                user: user._id,
                steps: [
                    { number: 1, description: "Paso 1 de la tarea 1" },
                    { number: 2, description: "Paso 2 de la tarea 1" },
                    { number: 3, description: "Paso 3 de la tarea 1" }
                ]
            },
            {
                title: "Tarea 2",
                description: "Mi tarea 2",
                status: 'IN PROGRESS',
                user: user._id,
                steps: [
                    { number: 1, description: "Paso 1 de la tarea 2" },
                    { number: 2, description: "Paso 2 de la tarea 2" },
                    { number: 3, description: "Paso 3 de la tarea 2" }
                ]
            },
            {
                title: "Tarea 3",
                description: "Mi tarea 3",
                status: 'IN PROGRESS',
                user: user._id,
                steps: [
                    { number: 1, description: "Paso 1 de la tarea 3" },
                    { number: 2, description: "Paso 2 de la tarea 3" },
                    { number: 3, description: "Paso 3 de la tarea 3" }
                ]
            },
        ];

        await Task.insertMany(tasksToCreate);

        console.log('Todas las tareas se crearon con éxito');

    } catch (error) {
        console.error('Error al crear las tareas', error);
    } finally {
        mongoose.connection.close();
    }
}

createTasks();
