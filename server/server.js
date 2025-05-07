const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://loveliberia.netlify.app'
}));

// Database connection
mongoose.connect('mongodb+srv://fredisaac2012:ATvCCwKBqBtRKAfE@cluster0.1ukcfz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Basic route
app.get('/', (req, res) => {
  res.send('LoveLiberia API');
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
});

const PORT = process.env.PORT || 5000;

// Load environment variables
require('dotenv').config();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
