// backend/controllers/bookingController.js
const Booking = require('../models/bookingModel');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// @desc    Get booked slots for a specific turf and date
// @route   GET /api/bookings/availability/:turfId
// @access  Public
const getBookedSlots = async (req, res) => {
  try {
    const { turfId } = req.params;
    // Get the date from the query string (e.g., ?date=2025-10-28)
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date query parameter is required' });
    }

    // Define the start and end of the selected day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Find all bookings for the given turf that are within the selected day
    const bookings = await Booking.find({
      turf: turfId,
      startTime: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: 'booked', // Only consider confirmed bookings
    });

    // Extract just the start times of the booked slots
    const bookedSlots = bookings.map(booking => {
      // Format to HH:00 (e.g., 14:00)
      return booking.startTime.getHours().toString().padStart(2, '0') + ':00';
    });

    res.json(bookedSlots);
  } catch (error)
 {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createRazorpayOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"), // a unique receipt ID
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const verifyPaymentAndCreateBooking = async (req, res) => {
  // All the console.log statements can be here at the top
  console.log("--- Verification Request Received ---");
  console.log("Request Body:", req.body);

  // The ENTIRE logic must be inside this single try block
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      id: turfId,
      startTime,
      endTime,
      totalPrice,
    } = req.body;

    // --- Signature verification logic ---
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");
    
    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }

    // --- Double booking check ---
    const existingBooking = await Booking.findOne({
      turf: turfId,
      startTime: new Date(startTime),
      status: 'booked',
    });

    if (existingBooking) {
      console.log("!!! ATTEMPTED TO DOUBLE BOOK A SLOT !!!");
      return res.status(409).json({ message: "Sorry, this slot was just booked by someone else." });
    }

    // --- Create booking logic ---
    const booking = new Booking({
      user: req.user._id,
      turf: turfId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      totalPrice: totalPrice,
      status: 'booked',
      paymentDetails: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
      },
    });

    await booking.save();
    console.log("Booking saved successfully.");
    res.status(201).json({ message: "Booking successful!", booking });

  // This catch block MUST immediately follow the try block's closing brace
  } catch (error) {
    console.error("!!! ERROR DURING VERIFICATION !!!", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}; 


module.exports = {
  getBookedSlots,
  createRazorpayOrder,
  verifyPaymentAndCreateBooking,
};