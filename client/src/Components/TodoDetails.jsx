import React from 'react';
import { useModal } from '../Context/ModalContext';
import { useTasks } from '../Context/TaskContext'; 
import { TitleBase } from './TitleBase';
import { TextBase } from './TextBase';
import { ButtonPrimary } from './ButtonPrimary';
import { EditTasksForm } from './Forms/EditTasksForm';

const TodoDetails = ({ task, onBackClick }) => {

    const { updateTasks, updateTask } = useTasks();
    const { openModal } = useModal();

    const colorStatus = (estado) => {
        switch (estado) {
            case "IN PROGRESS":
                return "text-red-600";
            case "HOLDING":
                return "text-yellow-400"; 
            case "FINISHED":
                return "text-green-600"; 
            default:
                return "text-gray-600"; 
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const storedToken = localStorage.getItem('token');
            const token = JSON.parse(storedToken);

            const headers = {
                'Content-Type': 'application/json',
                Authorization: token.token,
            };

            const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }else{
                const updatedTaskData = await response.json();
                updateTasks(updatedTaskData.tasks);
                updateTask(null);
            }

        } catch (error) {
            console.error('Hubo un error al guardar la tarea:', error);
        }
    };
    
    return (
        <section className='w-full max-w-md bg-white flex flex-col p-6 rounded-xl drop-shadow-md space-y-4'>
            <div className='space-y-1'>
                <div className='flex gap-2 justify-between items-center'>
                    <TitleBase><span className='uppercase'>Detalles de la Tarea</span></TitleBase>
                    <button onClick={() => handleDeleteTask(task._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
                <TextBase><strong>Nombre:</strong> {task.title}</TextBase>
                <TextBase><strong>Descripción:</strong> {task.description}</TextBase>
                <TextBase><strong>Estado:</strong> <span className={`font-semibold ${colorStatus(task.status)}`}>{task.status}</span></TextBase>
                <TitleBase>Pasos</TitleBase>
                {task.steps.map((step) => (
                    <TextBase key={step.number}>
                        {step.number}. {step.description}
                    </TextBase>
                ))}
            </div>
            <div className='flex gap-4'>
                <ButtonPrimary onClick={onBackClick} color='bg-red-600'>
                    Volver
                </ButtonPrimary>
                <ButtonPrimary onClick={() => openModal("Editar Tarea", <EditTasksForm task={task} />)}>
                    Editar
                </ButtonPrimary>
            </div>
        </section>
    );
};

export { TodoDetails };