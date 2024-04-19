import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Box } from '@mui/material';

const Shortestpath = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSourceChange = (e) => {
    setOrigin(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted: Source -', origin, ' Destination -', destination);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          p: 2,
          border: '1px solid #ccc',
          borderRadius: 4,
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          Enter Source and Destination
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="origin"
                name="origin"
                label="origin"
                value={origin}
                onChange={handleSourceChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="destination"
                name="destination"
                label="Destination"
                value={destination}
                onChange={handleDestinationChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Shortestpath;
