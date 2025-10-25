// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import turfService from '../services/turfService';
import TurfCard from '../components/TurfCard';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

// Basic styling for the container
const turfListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const HomePage = () => {
  // State to hold the list of turfs
  const [turfs, setTurfs] = useState([]);
  
  // State to hold the turfs that are actually displayed after filtering
  const [filteredTurfs, setFilteredTurfs] = useState([]);
  
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  // State for search query (location)
  const [searchQuery, setSearchQuery] = useState('');

   const [turfTypeFilter, setTurfTypeFilter] = useState('all'); // 'all', 'indoor', 'outdoor'
  const [priceSort, setPriceSort] = useState(''); // '', 'low-to-high', 'high-to-low'

  // useEffect hook runs after the component mounts
  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const data = await turfService.getTurfs();
        setTurfs(data);
      } catch (error) {
        toast.error('Could not fetch turfs');
      } finally {
        setIsLoading(false); // Stop loading, whether successful or not
      }
    };

    fetchTurfs();
  }, []); // The empty array [] means this effect runs only once
  useEffect(() => {
    let result = turfs;

    // 1. Filter by search query (location)
    if (searchQuery) {
      result = result.filter(turf =>
        turf.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // --- 2. ADD FILTER BY TURF TYPE ---
    if (turfTypeFilter !== 'all') {
      result = result.filter(turf => turf.turfType === turfTypeFilter);
    }

    // --- 3. ADD SORTING BY PRICE ---
    if (priceSort === 'low-to-high') {
      result = result.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (priceSort === 'high-to-low') {
      result = result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    }

    setFilteredTurfs(result);
  }, [searchQuery, turfTypeFilter, priceSort, turfs]);
  if (isLoading) {
    return <Spinner />;
  }



  return (
    <div>
      <h1>Find Your Turf</h1>
      
      <div className="filter-container">
        {/* Search Input (existing) */}
        <input
          type="text"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* --- ADD TURF TYPE FILTER --- */}
        <select value={turfTypeFilter} onChange={(e) => setTurfTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>

        {/* --- ADD PRICE SORT --- */}
        <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      <div style={turfListStyle}>
        {isLoading ? (
          <Spinner /> // Show spinner while loading
        ) : filteredTurfs.length > 0 ? (
          // --- CHANGE HERE ---
          filteredTurfs.map((turf) => (
            <TurfCard key={turf._id} turf={turf} />
          ))
        ) : (
          // --- AND HERE ---
          <p>No turfs match your search.</p>
        )}
      </div>
    </div>
  );

};

export default HomePage;