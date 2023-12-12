const mongoose = require('mongoose');
// Conexión a la base de datos
require('../config/database.js');
const User = require('../models/User.js'); 
const bcrypt = require('bcrypt');

// Crear un usuario
async function createUser() {
    try {
        const hashedPassword = await bcrypt.hash('123456789', 10);
        const user = new User({
            username: 'Nayelli Rodriguez',
            email: 'nayelli@gmail.com',
            password: hashedPassword
        });

        await user.save();
        console.log('Usuario creado con éxito');
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    } finally {
        mongoose.connection.close();
    }
}

createUser();
