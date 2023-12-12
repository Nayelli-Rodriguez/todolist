import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from './Components/InputField';
import { ButtonSubmit } from './Components/ButtonSubmit';
import { useAuth } from '../../Context/AuthContext';

const LoginForm = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const token = await response.json();
                //Almacenamos el token
                localStorage.setItem('token', JSON.stringify(token));

                login();

                navigate('/dashboard');

            } else {
                throw new Error('Error');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full max-w-md space-y-4 bg-white flex flex-col p-4 lg:p-6 rounded-xl'>
            <InputField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
            />
            <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <ButtonSubmit>
                Iniciar sesión
            </ButtonSubmit>
        </form>
    );
};

export { LoginForm };
