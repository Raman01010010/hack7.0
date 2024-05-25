import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Import LocalizationProvider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Adddata = () => {
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
    try {
      const response = await axios.post("/data/addData", accidentDetails);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding data:", error.message);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
       
      }}
    >
      <Box sx={{ p: 2, background: "#ffffff", border: "1px solid #ccc", borderRadius: 4, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom align="center">
          Accident details
        </Typography>
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
            ADD DATA
          </Button>
       
      </Box>
    </Box>
  );
};

export default Adddata;
