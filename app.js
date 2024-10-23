const express = require('express');
const path = require('path');
const app = express();
const generateDocs = require('./index');  // Import your function to generate documentation

// Middleware to parse JSON requests
app.use(express.json());

// Serve the frontend documentation page (index.html)
app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Serve the static HTML page
});

// Serve the generated API documentation as JSON
app.get('/api/docs', async (req, res) => {
    try {
        const documentation = await generateDocs();  // Generate documentation dynamically
        res.json({ documentation });  // Respond with the generated documentation
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate documentation' });
    }
});

// In-memory storage for users (for demonstration purposes)
let users = [];

// Get all users
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

// Create a new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: `${Date.now()}`,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get a user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      name: req.body.name,
      email: req.body.email
    };
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Export the app for testing
module.exports = app;
