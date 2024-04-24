import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ParkingForm = () => {
    const axios = useAxiosPrivate();

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

    // Update form data when any input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("sv")
        try {
            console.log("tt")
            // Send form data to the server
            const response = await axios.post("/park/addcomp", formData);
            console.log("pm");
            console.log(response.data); // Log response from the server
            // Reset the form after successful submission
            console.log("succes");
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
        } catch (error) {
            console.error("Error adding data:", error.message);
        }
    };
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
                    Submit
                </Button>
            </form>
        </Container>
    );
}

export default ParkingForm;
