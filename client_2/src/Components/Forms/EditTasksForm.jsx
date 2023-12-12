import React, { useState } from 'react';
import { useModal } from '../../Context/ModalContext';
import { useTasks } from '../../Context/TaskContext'; 
import { Label } from './Components/Label';
import { InputField } from './Components/InputField';
import { TextArea } from './Components/TextArea';
import { ButtonSubmit } from './Components/ButtonSubmit';

const EditTasksForm = ({ task }) => {

    const { closeModal } = useModal();
    const { updateTasks, updateTask } = useTasks();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [taskStatus, setTaskStatus] = useState(task.status);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave({task, title, description, status: taskStatus});
    };

    const handleSave = async (updatedTask) => {
        try {
            const storedToken = localStorage.getItem('token');
            const token = JSON.parse(storedToken);

            const headers = {
                'Content-Type': 'application/json',
                Authorization: token.token,
            };

            const response = await fetch(`http://localhost:3000/api/tasks/${updatedTask.task._id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la tarea');
            }else{
                const updatedTaskData = await response.json();
                updateTasks(updatedTaskData.tasks);
                updateTask(updatedTaskData.task);
                closeModal();
            }

        } catch (error) {
            console.error('Hubo un error al guardar la tarea:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='w-full flex flex-col gap-1'>
                <Label htmlFor="title">
                    Nombre
                </Label>
                <InputField 
                    id="title" 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="w-full flex flex-col gap-1">
                <Label htmlFor="description">
                    Descripción
                </Label>
                <TextArea 
                    id="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="w-full flex flex-col gap-1">
                <Label htmlFor="status">
                    Estado
                </Label>
                <select 
                    id="status"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    className='rounded-md border-indigo-500/40 focus:border-2 focus:border-indigo-500 focus:ring-0 focus:outline-none w-full'
                >
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="HOLDING">HOLDING</option>
                    <option value="FINISHED">FINISHED</option>
                </select>
            </div>
            <ButtonSubmit>
                Guardar
            </ButtonSubmit>
        </form>
    );
};

export { EditTasksForm };