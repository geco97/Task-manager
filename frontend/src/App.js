import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import RegisterPage from './components/RegisterPage';
import TaskManager from './components/TaskManager';
import Header from './components/Header';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const isAuthenticated = () => {
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    };

    const ProtectedRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Header token={token} setToken={setToken} />
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tasks" element={
                    <ProtectedRoute>
                        <TaskManager token={token} />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;
