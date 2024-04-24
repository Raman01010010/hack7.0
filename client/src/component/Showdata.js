import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Showdata = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/park/showdata');
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        setParkingLots(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData(); 
  }, []); 

  return (
    <div>
      <Typography variant="h3" gutterBottom align="center">Parking Lot Data</Typography>
      <Grid container spacing={3} justifyContent="center">
        {parkingLots.map((parkingLot, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {parkingLot.parkingLotName}
                </Typography>
                <Typography variant="body1">
                  Location: {parkingLot.location.coordinates[0]}, {parkingLot.location.coordinates[1]}
                </Typography>
                <Typography variant="body1">
                  First Name: {parkingLot.firstName}
                </Typography>
                <Typography variant="body1">
                  Last Name: {parkingLot.lastName}
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Showdata;
