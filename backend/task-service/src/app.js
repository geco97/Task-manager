const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

const { DB_URI } = process.env;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);  // Exit the app if the database connection fails
    });

const app = express();
app.use(cors({
    origin: '*'  
}));
app.use(express.json());
app.use('/tasks', taskRoutes);

module.exports = app;
