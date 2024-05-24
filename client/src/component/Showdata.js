import React, { useContext, useEffect } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from "../context/User";

const Showdata = () => {
  const { parkingLots } = useContext(User);

  useEffect(() => {
    console.log("vivek", parkingLots);
  }, [parkingLots]);

  return (
    <div>
      {parkingLots.length === 0 ? (
        <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>
          No parking lots available. Please try a different search.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {parkingLots.map((parkingLot, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to={`/bookit/${parkingLot.id}`} style={{ textDecoration: 'none' }}>
                <Card variant="outlined" style={{ cursor: 'pointer' }}>
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
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Showdata;
