import React from 'react';

const TextArea = ({ id, value, onChange, placeholder }) => {
    return (
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="rounded-md border-indigo-500/40 focus:border-2 focus:border-indigo-500 focus:ring-0 focus:outline-none"
        />
    );
};

export { TextArea } ;
