import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ token, setToken }) => {
    const navigate = useNavigate();  // Initialize useNavigate

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');  // Redirect to /login after logging out
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Task Manager App
                </Typography>
                <Box>
                    {token ? (
                        <>
                            <Button color="inherit" component={Link} to="/tasks">
                                Tasks
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
