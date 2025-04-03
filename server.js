// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Enhanced task structure with completion status and due date
let tasks = [];

// Route to get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Route to add a new task
app.post('/api/tasks', (req, res) => {
  const { task, dueDate } = req.body;
  if (task) {
    const newTask = {
      id: Date.now(), // Use timestamp as unique ID
      text: task,
      completed: false,
      dueDate: dueDate || null
    };
    tasks.push(newTask);
    res.json({ message: 'Task added successfully', tasks });
  } else {
    res.status(400).json({ error: 'Task is required' });
  }
});

// Route to toggle task completion status
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    res.json({ message: 'Task status updated', tasks });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Route to delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const originalLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  
  if (tasks.length < originalLength) {
    res.json({ message: 'Task deleted successfully', tasks });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser to view the app`);
});
