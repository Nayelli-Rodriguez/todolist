import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { LoginForm } from '../Components/Forms/LoginForm';
import { Title } from '../Components/Title';

const Home = ({children}) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <section className='space-y-6 flex flex-col items-center'>
            <Title>
                Iniciar Sesión
            </Title>
            <LoginForm />
        </section>
    );
};

export { Home };