const express = require('express');
const router = express.Router();

const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/users-create', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send('Usuario creado con éxito');
    } catch (error) {
        res.status(500).send('Error al crear el usuario');
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        //Validamos que la contraseña coincida
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            
            // Si la autenticación es exitosa, genera un token JWT
            const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });
            // Envía el token al cliente como parte de la respuesta
            res.json({ token });
        
        } else {
            // Autenticación fallida
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
