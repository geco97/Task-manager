import axios from 'axios';

const API_URL = process.env.REACT_APP_TASK_API_URL || 'http://localhost:5001';

export const getTasks = async (token) => {
    const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const addTask = async (title, token) => {
    const response = await axios.post(
        `${API_URL}/tasks`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const deleteTask = async (taskId, token) => {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateTask = async (taskId, title,completed, token) => {
    const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        { title,completed },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
export const toggleTaskCompletion = async (taskId, completed,title, token) => {
    const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        { completed,title },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};