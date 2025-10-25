// backend/routes/turfRoutes.js
const express = require('express');
const router = express.Router();
const { createTurf, getTurfs , getTurfById } = require('../controllers/turfController');
const { protect } = require('../middleware/authMiddleware');

// Route to get all turfs (Public)


// Route to create a new turf (Private - requires login)
// We place the 'protect' middleware before the 'createTurf' controller.
// This means protect will run first. If the user is not authenticated,
// it will end the request-response cycle and send an error.
// If they are authenticated, it will call next() and proceed to createTurf.
router.route('/').get(getTurfs).post(protect, createTurf);

router.route('/:id').get(getTurfById);

module.exports = router;