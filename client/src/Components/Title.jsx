import React from 'react';

const Title = ({children}) => {
    return (
        <h1 className="text-4xl font-bold text-white">
            { children }
        </h1>
    );
};

export { Title };