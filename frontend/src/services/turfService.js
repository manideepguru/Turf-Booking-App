// frontend/src/services/turfService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/turfs/';

// Get all turfs
const getTurfs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getTurfById = async (turfId) => {
  const response = await axios.get(API_URL + turfId);
  return response.data;
};

const turfService = {
  getTurfs, getTurfById
};



export default turfService;