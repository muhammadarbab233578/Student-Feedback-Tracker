const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

async function start() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedbackDB';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Routes
    const feedbackRoutes = require('./routes/feedbackRoutes');
    app.use('/api/feedback', feedbackRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error(
      'Fix: set a valid MONGO_URI in backend/.env (local MongoDB or Atlas connection string).'
    );
    process.exit(1);
  }
}

start();