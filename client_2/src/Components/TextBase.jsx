import React from 'react';

const TextBase = ({ children }) => {
    return (
        <p className="text-sm text-black">
            { children }
        </p>
    );
};

export { TextBase };
