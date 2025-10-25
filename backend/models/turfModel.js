const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates a link to the User model
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  amenities: [String], // An array of strings like ["Parking", "Refreshments"]
  turfType: {
    type: String,
    enum: ['indoor', 'outdoor'],
    required: true,
  },
  // We will add more fields like images, reviews, etc., later.
}, {
  timestamps: true,
});

const Turf = mongoose.model('Turf', turfSchema);

module.exports = Turf;