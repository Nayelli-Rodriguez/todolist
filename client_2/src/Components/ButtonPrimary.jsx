import React from 'react';

const ButtonPrimary = ({ onClick, children, color = "bg-cyan-500" }) => {
    return (
        <button className={`text-white font-medium rounded-md w-full py-3 hover:opacity-90 ${color}`} onClick={onClick}>
            {children}
        </button>
    );
};

export { ButtonPrimary };