// backend/controllers/turfController.js
const Turf = require('../models/turfModel');
const mongoose = require('mongoose');

// --- 1. Create a new turf ---
// @desc    Create a new turf
// @route   POST /api/turfs
// @access  Private (Admin Only - we'll add admin check later)
const createTurf = async (req, res) => {
  const { name, location, pricePerHour, amenities, turfType } = req.body;

  // Basic validation
  if (!name || !location || !pricePerHour || !turfType) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const turf = new Turf({
      name,
      location,
      pricePerHour,
      amenities,
      turfType,
      owner: req.user._id, // The logged-in user is the owner
    });

    const createdTurf = await turf.save();
    res.status(201).json(createdTurf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- 2. Get all turfs ---
// @desc    Fetch all turfs
// @route   GET /api/turfs
// @access  Public
const getTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find({}); // Find all turfs
    res.json(turfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// --- 3. Get a single turf by ID ---
// @desc    Fetch a single turf
// @route   GET /api/turfs/:id
// @access  Public
const getTurfById = async (req, res) => {
     const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid turf ID format' });
  }
  try {
    const turf = await Turf.findById(req.params.id);

    if (turf) {
      res.json(turf);
    } else {
      res.status(404).json({ message: 'Turf not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  createTurf,
  getTurfs,
  getTurfById, // <-- Export the new function
};