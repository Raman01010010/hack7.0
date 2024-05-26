import * as React from "react";
import { useState,useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import axios2 from 'axios';
import backgroundImage from '../utility/pexels-dominika-kwiatkowska-1796968-3368844.jpg'; // Import your background image

import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Import LocalizationProvider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import swal from 'sweetalert';
import { TailSpin } from 'react-loader-spinner';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Adddata = () => {
  const [loading, setLoading] = useState(false);
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
      backgroundImage: `url(${backgroundImage})`, // Use the imported image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    heading: {
        // marginBottom: '1rem',
        fontSize: '2rem',
        color: '#343a40',
      },
    overlay: {
        backgroundColor: 'rgba(300, 400, 300, 0.6)', // Add a semi-transparent overlay
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      },
};
  const [accidentDetails, setAccidentDetails] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    description: "",
    date:""
  });
const axios=useAxiosPrivate();
  

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const handleGetCoordinatesClick = async() => {
    const { address } = accidentDetails;
    if (address.trim() !== '') {
      const { lat, lng } = await getCoordinates(address);
      setAccidentDetails(prevFormData => ({
        ...prevFormData,
        latitude: lat,
        longitude: lng
    }));
    } else {
      swal({
        title: "Please enter an address",
        icon: "warning",
        button: "OK",
      });
    }
  };
  const getCoordinates = async (address) => {
    const apiKey = '55810e9a0db5484fae278428320f9add';
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios2.get(url);

        if (response.data.results && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            console.log("Coordinates:", lat, lng);
            return { lat, lng };
        } else {
            throw new Error('No results found for the address.');
        }
    } catch (error) {
        console.error('Error getting coordinates:', error.message);
        throw error;
    }
}
  const updateLocationSuggestions = async (query) => {
    const apiKey = "55810e9a0db5484fae278428320f9add";

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          query
        )}&key=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const suggestions = data.results.map((result) => ({
            formatted: result.formatted,
            // You can include additional information from the API response if needed
            // For example: latitude: result.geometry.lat, longitude: result.geometry.lng
          }));

          setLocationSuggestions(suggestions);
        } else {
          setLocationSuggestions([]);
        }
      } else {
        console.error(
          "Error fetching location suggestions:",
          response.statusText
        );
        setLocationSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error.message);
      setLocationSuggestions([]);
    }
  };

  const handleLocationSelection = (suggestion) => {
    setAccidentDetails((prevDetails) => ({
      ...prevDetails,
      startAddress: suggestion.formatted,
      latitude: "", // Reset latitude
      longitude: "" // Reset longitude
    }));
    setLocationSuggestions([]); // Clear location suggestions after selection
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccidentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
    console.log(accidentDetails);
    updateLocationSuggestions(value); // Update location suggestions based on user input
  };
  async function addNow() {
    setLoading(true);
    try {
      const response = await axios.post("/data/addData", accidentDetails);
      console.log(response.data);
      swal({
        title: "Successfully added",
        icon: "success",
        button: false,
        timer: 3000
      });
      setLoading(false);
      navigate('/dashboard');

    } catch (error) {
      console.error("Error adding data:", error.message);
      setLoading(false);

    }

  }
  const navigate = useNavigate(); // Access to navigate function
  useEffect(() => {
    // Automatically reset loading state after a delay (for demonstration)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change the delay as needed

    return () => clearTimeout(timeout);
  }, [loading]);
  const [data,setData]=useState(false)
  useEffect(() => {
    // Update location suggestions when address input changes
    
    updateLocationSuggestions(accidentDetails.address);
  }, [accidentDetails.address]);

  return (
    <>
    <div style={styles.backgroundImage}></div>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
       
      }}
    >
       


       <div style={styles.overlay}>

      <Box sx={{ p: 2, borderRadius: 4, maxWidth: 400 }}>
      <h1 style={styles.heading}>Add Accident Details</h1>


        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              fullWidth
              value={accidentDetails.name}
              onChange={handleChange}
            />
          </Grid>
         
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="address Address"
              fullWidth
              value={accidentDetails.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleGetCoordinatesClick} fullWidth>
              Get Coordinates
            </Button>
          </Grid>
          {locationSuggestions.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Location Suggestions:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {locationSuggestions.map((suggestion, index) => (
                  <Chip
                    key={index}
                    label={suggestion.formatted}
                    onClick={() => handleLocationSelection(suggestion)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="latitude"
              name="latitude"
              label="Latitude"
              fullWidth
              value={accidentDetails.latitude}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="longitude"
              name="longitude"
              label="Longitude"
              fullWidth
              value={accidentDetails.longitude}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={dayjs(accidentDetails.date)}
                onChange={(newDate) => {
                  setAccidentDetails((prevDetails) => ({
                    ...prevDetails,
                    date: newDate.toISOString()
                  }));
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={accidentDetails.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        
          <Button variant="contained" onClick={addNow} fullWidth sx={{ mt: 3 }}>
          {loading? <TailSpin height={25} color="white"/>:'ADD data'} 
          </Button>
          
      </Box>
      </div>
    </Box>
    </>
  );
};

export default Adddata;
