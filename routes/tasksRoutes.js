const express = require('express');
const router = express.Router();
const Task = require('../models/Task');  
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/tasks', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await Task.find({ user: userId });
        res.json({ tasks });
    } catch (error) {
        console.error('Error al obtener las tareas del usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

router.put('/tasks/:taskId', authMiddleware, async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const userId = req.user.userId;
        const { title, description, status } = req.body;
        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        task.title = title;
        task.description = description;
        task.status = status;

        await task.save();
        const tasks = await Task.find({ user: userId });
        res.json({ tasks, task });

    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

router.post('/tasks/create', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, description, status } = req.body;

        const newTask = new Task({
            title,
            description,
            status,
            user: userId
        });

        await newTask.save(); 

        const tasks = await Task.find({ user: userId });
        res.json({ tasks });

    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

router.delete('/tasks/:taskId', authMiddleware, async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.userId; // Asumiendo que usas autenticación y el usuario está vinculado a la tarea

        const task = await Task.findOne({ _id: taskId, user: userId });
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        const tasks = await Task.find({ user: userId });

        await Task.deleteOne({ _id: taskId });
        res.status(200).json({tasks});

    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
