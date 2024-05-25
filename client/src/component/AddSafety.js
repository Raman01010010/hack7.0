import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { User } from "../context/User";
import LinearProgress from '@mui/material/LinearProgress';

import CircularProgress from '@mui/material/CircularProgress';

function LinearIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}
const AddSafety = () => {
  const {newUser}=React.useContext(User)
console.log(newUser)  
  const [safteyDetails, setsafteyDetails] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    notes: "",
    relationship: "",
    user:newUser.userid
   
  });
const axios=useAxiosPrivate();


 

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setsafteyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
    console.log(safteyDetails);
  // Update location suggestions based on user input
  };
  async function addNow() {
    try {
      const response = await axios.post("/alert/add", safteyDetails);
      console.log(response.data);
      toast('Data added successfully');
      setsafteyDetails({
        name: "",
        phoneNumber: "",
        email: "",
        notes: "",
        relationship: "",
        user:newUser.userid
       
      })
    } catch (error) {
      console.error("Error adding data:", error.message);
    }
  }

  return (
    <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 4, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom align="center">
          saftey details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              fullWidth
              value={safteyDetails.name}
              onChange={handleChange}
            />
          </Grid>
         
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="E-mail"
              fullWidth
              value={safteyDetails.email}
              onChange={handleChange}
            />
            
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              value={safteyDetails.phoneNumber}
              onChange={handleChange}
            />
            
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="relationship"
              name="relationship"
              label="relationship"
              fullWidth
              value={safteyDetails.relationship}
              onChange={handleChange}
            />
            
          </Grid>
         
          
          <Grid item xs={12}>
            <TextField
              required
              id="notes"
              name="notes"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={safteyDetails.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
     
          <Button variant="contained" onClick={addNow} fullWidth sx={{ mt: 3 }}>
            ADD DATA
          
          </Button>
         
          <ToastContainer/>
     
      </Box>
    </Box>
    
     </>
  );
};

export default AddSafety;
