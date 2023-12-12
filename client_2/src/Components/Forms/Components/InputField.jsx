import React from 'react';

const InputField = ({ type, value, onChange, placeholder }) => {
    return (
        <input
            className='rounded-md border-indigo-500/40 focus:border-2 focus:border-indigo-500 focus:ring-0 focus:outline-none'
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    );
};

export { InputField } ;
