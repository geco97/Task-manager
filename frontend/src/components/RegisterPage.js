import React, { useState } from 'react';
import { register } from '../api/authApi';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await register(username, password, email);
            setSuccess('Registration successful! You can now log in.');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={5} p={3} borderRadius={2} boxShadow={3} textAlign="center">
                <Typography variant="h5" gutterBottom>Register</Typography>
                <form onSubmit={handleRegister}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        Register
                    </Button>
                </form>
                {error && <Typography color="error" mt={2}>{error}</Typography>}
                {success && <Typography color="primary" mt={2}>{success}</Typography>}
            </Box>
        </Container>
    );
};

export default RegisterPage;
