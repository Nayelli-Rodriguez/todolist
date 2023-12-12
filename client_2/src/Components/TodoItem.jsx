import React from 'react';

const TodoItem = ({ children }) => {
    return (
        <li className='w-full bg-indigo-500/10 p-3 rounded-md cursor-pointer'>
            {children}
        </li>
    );
};

export { TodoItem };
