import React, { useState,useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { User } from "../context/User";

import { TailSpin } from 'react-loader-spinner';

const ParkingForm = () => {
    // const axios = require('axios');

    const [loading, setLoading] = useState(false);

    const axios = useAxiosPrivate();
    const {address,arrivalDate,departureDate}=useContext(User)

  const [formData, setFormData] = useState({
        parkingLotName: '',
        locationType: '', // New field for location type
        latitude: '', // New field for latitude
        longitude: '', // New field for longitude
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        totalSlots: ''
    });

    // Define locationType from formData
    const { locationType } = formData;
    async function getCoordinates(address) {
        const apiKey = '55810e9a0db5484fae278428320f9add';
        const encodedAddress = encodeURIComponent(address);
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;
        
        try {
            const response = await axios.get(url);
    
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
    // Update form data when any input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        // Call getCoordinates function when locationType changes
        if (locationType.trim() !== '') {
            const fetchCoordinates = async () => {
                try {
                    const { lat, lng } = await getCoordinates(locationType);
                    setFormData({
                        ...formData,
                        latitude: lat,
                        longitude: lng
                    });
                } catch (error) {
                    console.error("Error getting coordinates:", error.message);
                }
            };
    
            fetchCoordinates();
        }
    }, [locationType]);
       // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        console.log("v")
        try {
            console.log("tt")
            // Send form data to the server
            const response = await axios.post("/park/addcomp", formData);
            console.log("pm");
            console.log(response.data); 
            console.log("succes");
            swal({
                title: "Successfully registered",
                icon: "success",
                button: false,
                timer: 3000
              });
            setFormData({
                parkingLotName: '',
                locationType: '',
                latitude: '',
                longitude: '',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                totalSlots: ''
            });
            setLoading(false);
      navigate('/dashboard');
        } catch (error) {
            console.error("Error adding data:", error.message);
            setLoading(false);

        }
    };
    const navigate = useNavigate(); // Access to navigate function
    useEffect(() => {
        // Automatically reset loading state after a delay (for demonstration)
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 3000); // Change the delay as needed
    
        return () => clearTimeout(timeout);
      }, [loading]);
    
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Parking Reservation Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Parking Lot Name"
                            name="parkingLotName"
                            variant="outlined"
                            value={formData.parkingLotName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Location Type"
                            name="locationType"
                            variant="outlined"
                            value={formData.locationType}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Latitude"
                            name="latitude"
                            variant="outlined"
                            value={formData.latitude}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Longitude"
                            name="longitude"
                            variant="outlined"
                            value={formData.longitude}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Total Slots"
                            name="totalSlots"
                            variant="outlined"
                            value={formData.totalSlots}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Personal Details
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                {loading? <TailSpin height={25} color="white"/>:'Register'} 

                </Button>
            </form>
        </Container>
    );
}

export default ParkingForm;
