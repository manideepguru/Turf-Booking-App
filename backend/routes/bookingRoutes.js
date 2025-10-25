// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { getBookedSlots, createRazorpayOrder ,verifyPaymentAndCreateBooking} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware'); 

// Route to get booked slots for a specific turf and date
router.get('/availability/:turfId', getBookedSlots);
router.post('/orders', protect, createRazorpayOrder);
router.post('/orders', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPaymentAndCreateBooking);

module.exports = router;