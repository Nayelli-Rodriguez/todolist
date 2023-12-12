import React from 'react';

const TitleBase = ({ children }) => {
    return (
        <h4 className="text-base font-bold text-indigo-500">
            { children }
        </h4>
    );
};

export { TitleBase };
