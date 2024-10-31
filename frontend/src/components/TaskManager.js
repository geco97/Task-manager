import React, { useState, useEffect } from 'react';
import { getTasks, addTask, deleteTask, updateTask, toggleTaskCompletion } from '../api/taskApi';
import {
    TextField,
    Button,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Container,
    Input,
    Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const TaskManager = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getTasks(token);
                setTasks(tasksData);
            } catch (error) {
                setError('Failed to load tasks');
            }
        };
        fetchTasks();
    }, [token]);

    const handleAddTask = async () => {
        try {
            const addedTask = await addTask(newTask, token);
            setTasks([...tasks, addedTask]);
            setNewTask('');
        } catch (error) {
            setError('Failed to add task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId, token);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            setError('Failed to delete task');
        }
    };

    const handleEditTask = (task) => {
        setEditingTaskId(task._id);
        setEditTaskTitle(task.title);
    };

    const handleUpdateTask = async (taskd) => {
        try {
            const updatedTask = await updateTask(taskd._id, editTaskTitle,taskd.completed, token);
            setTasks(tasks.map(task => (task._id === taskd._id ? updatedTask : task)));
            setEditingTaskId(null);
            setEditTaskTitle('');
        } catch (error) {
            setError('Failed to update task');
        }
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditTaskTitle('');
    };

    const handleToggleCompletion = async (taskd, completed) => {
        try {
            const updatedTask = await toggleTaskCompletion(taskd._id, completed,taskd.title, token);
            setTasks(tasks.map(task => (task._id === taskd._id ? updatedTask : task)));
        } catch (error) {
            setError('Failed to toggle task completion');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5} p={3} borderRadius={2} boxShadow={3} textAlign="center">
                <Typography variant="h5" gutterBottom>Task Manager</Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <TextField
                        label="New Task"
                        variant="outlined"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={handleAddTask} variant="contained" color="primary" style={{ marginLeft: '10px', height: '100%' }}>
                        Add
                    </Button>
                </Box>
                {error && <Typography color="error" mt={2}>{error}</Typography>}
                <List>
                    {tasks.map((task) => (
                        <ListItem key={task._id} divider>
                            <Checkbox
                                checked={task.completed}
                                onChange={() => handleToggleCompletion(task, !task.completed)}
                                color="primary"
                            />
                            {editingTaskId === task._id ? (
                                <>
                                    <Input
                                        value={editTaskTitle}
                                        onChange={(e) => setEditTaskTitle(e.target.value)}
                                        fullWidth
                                    />
                                    <IconButton onClick={() => handleUpdateTask(task)} color="primary">
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton onClick={handleCancelEdit} color="secondary">
                                        <CancelIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <ListItemText
                                        primary={task.title}
                                        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                                    />
                                    <IconButton onClick={() => handleEditTask(task)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteTask(task._id)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default TaskManager;
