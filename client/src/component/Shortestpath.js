import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Box, CircularProgress, Container, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from '../api/axios';
import PathMap from './PathMap';

const Shortestpath = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSourceChange = (e) => {
    setOrigin(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/get_paths_and_accidents?origin=${origin}&destination=${destination}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 15 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom align="center">
          Enter Source and Destination
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="origin"
                name="origin"
                label="Origin"
                value={origin}
                onChange={handleSourceChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {data &&  data.paths && data.paths.length > 0 && data.paths[0] !== "error" &&
        <List sx={{ mt: 4 }}>
          {data.paths.map((path, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={`Path ${index + 1}`} />
              </ListItem>
              <ListItem>
                <PathMap path={path} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Accidents Count: ${data.accidents_counts[index]}`} />
              </ListItem>
              {index !== data.paths.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      }
    </Container>
  );
};

export default Shortestpath;

