import React from 'react';

const Label = ({ htmlFor, children }) => {
    return (
        <label
            className='text-sm'
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
};

export { Label } ;
