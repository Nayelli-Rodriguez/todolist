import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState();

    const updateTasks = (newTasks) => {
        setTasks(newTasks);
    };

    const updateTask = (Task) => {
        setTask(Task)
    }

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    return (
        <TaskContext.Provider value={{ task, tasks, updateTask, updateTasks, addTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};
