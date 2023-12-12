import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    const login = () => {
        setAuthenticated(true);
    };

    const logout = () => {
        setAuthenticated(false);
    };

    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos

        return exp > currentTime;
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
