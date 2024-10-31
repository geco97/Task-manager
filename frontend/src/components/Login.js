import React, { useState } from 'react';
import { login } from '../api/authApi';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            const { token } = await login(username, password);
            setToken(token);
            localStorage.setItem('token', token);
            navigate('/tasks');  // Redirect to /tasks after successful login
        } catch (error) {
            setError('Login failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={5} p={3} borderRadius={2} boxShadow={3} textAlign="center">
                <Typography variant="h5" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
                {error && <Typography color="error" mt={2}>{error}</Typography>}
            </Box>
        </Container>
    );
};

export default Login;
