import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Container } from '@mui/material';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Bookit = () => {
  const { id } = useParams();
  const [parkingLot, setParkingLot] = useState(null);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParkingLotDetails = async () => {
      try {
        const response = await axios.post('/park/bookit',id);
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        setParkingLot(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchParkingLotDetails();
  }, [id, axios]);

  const handleRegister = () => {
    // Add registration logic here
    alert('Registered successfully!');
    navigate('/');
  };

  if (!parkingLot) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center">
        Parking Lot Details
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {parkingLot.parkingLotName}
          </Typography>
          <Typography variant="body1">
            Location: {parkingLot.location.coordinates[0]}, {parkingLot.location.coordinates[1]}
          </Typography>
          <Typography variant="body1">
            Owner: {parkingLot.firstName} {parkingLot.lastName}
          </Typography>
          <Typography variant="body1">
            Slots Available: {parkingLot.slotsAvailable}
          </Typography>
          <Typography variant="body1">
            Email: {parkingLot.email}
          </Typography>
          <Typography variant="body1">
            Phone: {parkingLot.phone}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Company: {parkingLot.companyName}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Bookit;
