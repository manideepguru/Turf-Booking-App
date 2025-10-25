// frontend/src/components/TurfCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';


// Basic styling for the card
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px',
  width: '300px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
};

const turfNameStyle = {
  fontSize: '1.5em',
  marginBottom: '8px',
};

const cardLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const TurfCard = ({ turf }) => {
  return (
    <Link to={`/turf/${turf._id}`} style={cardLinkStyle}>
      <div style={cardStyle}>
        <h3 style={turfNameStyle}>{turf.name}</h3>
        <p><strong>Location:</strong> {turf.location}</p>
        <p><strong>Type:</strong> {turf.turfType}</p>
        <p><strong>Price:</strong> ₹{turf.pricePerHour} / hour</p>
      </div>
    </Link>
  );
};

export default TurfCard;