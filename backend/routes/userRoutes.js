// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Define the routes
// When a POST request comes to /api/users/register, call the registerUser function
router.post('/register', registerUser);

// When a POST request comes to /api/users/login, call the loginUser function
router.post('/login', loginUser);

module.exports = router;