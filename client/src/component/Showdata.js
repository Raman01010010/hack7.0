import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from "../context/User";

const Showdata = () => {
  const { parkingLots } = useContext(User);
  useEffect(() => {
    console.log("vivek", parkingLots);
  }, [parkingLots]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div>
      {parkingLots.length === 0 || parkingLots.availableParkingLots.length === 0 ? ( // Check if no parking lots are available
        <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>
          No parking lots available. Please try a different search.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {parkingLots.availableParkingLots.map((parkingLot, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                variant="outlined"
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  backgroundColor: index !== hoveredIndex ? '#fff' : '#f0f0f0',
                  transform: index === hoveredIndex ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
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
                  <Link to={`/book/${parkingLot._id}/${parkingLot.parkingLotName}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                      Book Slot
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Showdata;