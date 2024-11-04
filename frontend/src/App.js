import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import RegisterPage from './components/RegisterPage';
import TaskManager from './components/TaskManager';
import Header from './components/Header';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp * 1000 < Date.now()) {
                    setToken(null);
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Invalid token format:', error);
                setToken(null);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        checkTokenExpiration();
    }, [token, navigate]);

    return (
        <Router>
            <Header token={token} setToken={setToken} />
            <Routes>
                <Route
                    path="/login"
                    element={<Login setToken={setToken} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tasks" element={<TaskManager token={token} />} />
            </Routes>
        </Router>
    );
};

export default App;
