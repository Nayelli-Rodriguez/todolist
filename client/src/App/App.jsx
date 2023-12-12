// App.js o tu componente de rutas principal
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../Context/AuthContext';
import { TaskProvider } from '../Context/TaskContext';
import { ModalProvider } from '../Context/ModalContext';
import { Modal } from '../Components/Modal';

import { Layout } from './Layout';
import { Home } from '../View/Home';
import { Dashboard } from '../View/Dashboard';

function App() {
    return (
        <Router>
            <AuthProvider>
                <TaskProvider>
                    <ModalProvider>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Routes>
                        </Layout>
                        <Modal />
                    </ModalProvider>
                </TaskProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;

