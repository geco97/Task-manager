const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    const { title } = req.body;
    try {
        const task = new Task({ title, userId: req.userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task' });
    }
};

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body; 
    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { title, completed }, 
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task' });
    }
};
