// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const turfRoutes = require('./routes/turfRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors()); // <--- 2. USE CORS MIDDLEWARE

// Middleware to accept JSON data in the body
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Simple test route
app.get('/', (req, res) => {
  res.send('Turf Finder API is running...');
});

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/turfs', turfRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});