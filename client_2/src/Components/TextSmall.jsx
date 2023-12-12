import React from 'react';

const TextSmall = ({ children }) => {
    return (
        <p className="text-xs text-black">
            { children }
        </p>
    );
};

export { TextSmall };
