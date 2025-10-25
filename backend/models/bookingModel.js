const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  turf: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Turf',
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked',
  },
  paymentDetails: {
    paymentId: String,
    orderId: String,
    signature: String,
  },
  snacks: [{ // An array of snack objects
    name: String,
    quantity: Number,
    price: Number,
  }],
  equipment: [{ // An array of equipment objects
    name: String,
    quantity: Number,
    price: Number,
  }],
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;