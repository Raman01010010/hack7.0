import React, { useState, useEffect, useContext } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import image1 from '../utility/pexels-pok-rie-33563-1004409.jpg'; // Adjust the path to your image
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { User } from "../context/User";
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, Box, Typography } from '@mui/material';

const Search = () => {
  const axios = useAxiosPrivate();
  const { newUser } = useContext(User);
  const [address, setAddress] = useState('');
  const [dataFetched, setDataFetched] = useState(false); // Track if data has been fetched
  const navigate = useNavigate();
  const { parkingLots, setParkingLots, arrivalDate, setArrivalDate, departureDate, setDepartureDate } = useContext(User);
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true);
      
      const response = await axios.post('/park/showdata', {
        address,
        start: arrivalDate,
        departure: departureDate
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }
      setParkingLots(response.data);
      setDataFetched(true); // Set the dataFetched flag to true
      setLoading(false);
      navigate('/showdata');

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

 

  const styles = {
    container: {
      position: 'relative',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: 'auto',
      textAlign: 'center',
      overflow: 'hidden', // Hide overflow to prevent blurry edges
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      filter: 'blur(5px)', // Apply blur effect
      backgroundImage: `url(${image1})`, // Use the imported image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Add a semi-transparent overlay
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.5rem',
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ced4da',
      fontSize: '1rem',
      outline: 'none',
    },
    icon: {
      position: 'absolute',
      right: '0.75rem',
      fontSize: '1.25rem',
      color: '#6c757d',
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonIcon: {
      marginLeft: '0.5rem',
    },
    heading: {
      marginBottom: '2rem',
      fontSize: '2rem',
      color: '#343a40',
    },
  };

  return (
    <>
    <div style={styles.backgroundImage}></div>

    <div style={styles.container}>
      {/* Background image */}
      {/* Overlay */}
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Search for Parking</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Address, Place, or City"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="datetime-local"
              placeholder="Arrival Date and Time"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              style={styles.input}
            />
            <FaCalendarAlt style={styles.icon} />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="datetime-local"
              placeholder="Departure Date and Time"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              style={styles.input}
            />
            <FaCalendarAlt style={styles.icon} />
          </div>
          <button type="submit" style={styles.button}>
            Search
            <FaSearch style={styles.buttonIcon} />
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Search;
