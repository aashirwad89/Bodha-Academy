require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: '✨ Welcome to Bodha Academy Backend! ✨',
    status: 'Server is running smoothly.',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      user: '/api/user'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Bodha Wizard Academy API listening on http://localhost:${PORT}`);
});
