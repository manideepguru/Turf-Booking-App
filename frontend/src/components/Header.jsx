// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Simple CSS for the header (we'll make it prettier later)
const headerStyle = {
  background: '#333',
  color: '#fff',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 10px',
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <div className="logo">
        <Link to="/" style={{ ...navLinkStyle, fontSize: '1.5rem' }}>
          Turf Finder
        </Link>
      </div>
      <nav>
        <Link to="/login" style={navLinkStyle}>
          Login
        </Link>
        <Link to="/register" style={navLinkStyle}>
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;