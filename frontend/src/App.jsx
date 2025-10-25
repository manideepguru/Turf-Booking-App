// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Styles for the notifications
import TurfDetailsPage from './pages/TurfDetailsPage';

// Import components and pages
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main style={{ padding: '20px' }}>
          <Routes>
            {/* Define the route for the homepage */}
            <Route path="/" element={<HomePage />} />
            
            {/* Define the route for the login page */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Define the route for the register page */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/turf/:id" element={<TurfDetailsPage />} />
          </Routes>
        </main>
      </div>
      {/* This component is for showing notifications */}
      <ToastContainer />
    </Router>
  );
}

export default App;