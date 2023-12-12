import React from 'react';

const ButtonSubmit = ({ children }) => {
    return (
        <button type="submit" className='bg-indigo-500 text-white font-medium rounded-md w-full py-3 hover:opacity-90'>
            {children}
        </button>
    );
};

export { ButtonSubmit };
