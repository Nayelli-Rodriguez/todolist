import React from 'react';

const TitleSmall = ({ children }) => {
    return (
        <h6 className="text-sm font-bold text-indigo-500">
            { children }
        </h6>
    );
};

export { TitleSmall };
