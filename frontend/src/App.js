import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import RegisterPage from './components/RegisterPage';
import TaskManager from './components/TaskManager';
import Header from './components/Header';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

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
