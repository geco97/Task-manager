import axios from 'axios';

const API_URL = process.env.REACT_APP_AUTH_API_URL || 'http://localhost:31000';

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
};

export const register = async (username,email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, { username,email, password });
    return response.data;
};
