import React from 'react';
import { useModal } from '../Context/ModalContext';
import { TodoItem } from '../Components/TodoItem';
import { TitleSmall } from '../Components/TitleSmall';
import { TextSmall } from '../Components/TextSmall';
import { ButtonPrimary } from './ButtonPrimary';
import { TasksForm } from './Forms/TasksForm';

const TodoList = ({ tasks, onTaskClick }) => {

    const { openModal } = useModal();

    const colorStatus = (estado) => {
        switch (estado) {
            case "IN PROGRESS":
                return "bg-red-600";
            case "HOLDING":
                return "bg-yellow-400"; 
            case "FINISHED":
                return "bg-green-600"; 
            default:
                return "bg-gray-600"; 
        }
    };

    return (
        <section className="w-full max-w-md bg-white flex flex-col p-6 rounded-xl drop-shadow-md gap-6">
            <ul className='space-y-4 max-h-96 overflow-y-auto'>
                {tasks.map((element) => (
                    <div key={element._id} onClick={() => onTaskClick(element)}>
                        <TodoItem>
                            <div className='flex justify-between'>
                                <TitleSmall>
                                    {element.title}
                                </TitleSmall>
                                <div className={`h-4 w-4 rounded-full ${colorStatus(element.status)}`}></div>
                            </div>
                            <TextSmall>
                                {element.description}
                            </TextSmall>
                        </TodoItem>
                    </div>
                ))}
            </ul>
            <ButtonPrimary onClick={() => openModal("Nueva Tarea", <TasksForm />)}>
                Nueva tarea
            </ButtonPrimary>
        </section>
    );
};

export { TodoList };
