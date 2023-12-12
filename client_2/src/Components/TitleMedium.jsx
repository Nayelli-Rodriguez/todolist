import React from 'react';

const TitleMedium = ({children}) => {
    return (
        <h3 className="text-xl font-medium">
            { children }
        </h3>
    );
};

export { TitleMedium };