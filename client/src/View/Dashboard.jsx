import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useTasks } from '../Context/TaskContext';

import { Title } from '../Components/Title';
import { TodoList } from '../Components/TodoList';
import { TodoDetails } from '../Components/TodoDetails';


const Dashboard = () => {
    const { isAuthenticated } = useAuth();
    const { task, tasks, updateTask, updateTasks } = useTasks();
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const token = JSON.parse(storedToken);

        const headers = {
            'Content-Type': 'application/json',
            Authorization: token.token,
        };

        fetch('http://localhost:3000/api/tasks', {
            method: 'GET',
            headers: headers,
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        }).then((data) => {
            updateTasks(data.tasks);
        }).catch((error) => {
            console.error('Error al cargar la lista de elementos', error);
        });
    });

    if (!isAuthenticated()) {
        return <Navigate to="/" />;
    }

    const handleSelectTask = (selectTask) => {
        updateTask(selectTask);
    };

    const handleBackTasks = () => {
        updateTask(null);
    };

    return (
        <section className='space-y-6 flex flex-col items-center'>
            <Title>
                Tus Tareas
            </Title>
            {task ? (
                <TodoDetails task={task} onBackClick={handleBackTasks} />
            ) : (
                <TodoList tasks={tasks} onTaskClick={handleSelectTask} />
            )}  
        </section>
    );
};

export { Dashboard };