// frontend/src/services/bookingService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/bookings/';

// Get booked slots for a specific turf on a given date
const getBookedSlots = async (turfId, date) => {
  // Format the date to YYYY-MM-DD for the query parameter
  const formattedDate = date.toISOString().split('T')[0];
  
  const response = await axios.get(
    `${API_URL}availability/${turfId}?date=${formattedDate}`
  );

  return response.data;
};

const createOrder = async (amount, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + 'orders', { amount }, config);
  return response.data;
};

// Verify payment and create booking
const verifyPaymentAndBook = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + 'verify', bookingData, config);
  return response.data;
};

const bookingService = {
  getBookedSlots,
  createOrder,
  verifyPaymentAndBook,
};


export default bookingService;