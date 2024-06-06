import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from "../context/User";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Bookit = () => {
  const axios = useAxiosPrivate();
  const { arrivalDate, departureDate, newUser } = useContext(User);
  const { id, company } = useParams(); // Get the company ID from URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    compid: id,
    userid: newUser.username,
    compName: company,
    licensePlate: '',
    vehicleType: '',
    ownerName: '',
    phone: '',
    startTime: arrivalDate,
    endTime: departureDate
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/park/bookit', formData);
      if (response.status !== 200) {
        throw new Error('Failed to book the slot');
      }
      console.log('Booking successful:', response.data);

      // Navigate to the ticket page with form data and booking key
      navigate('/ticket', {
        state: {
          formData,
          companyId: id,
          bookingKey: response.data.key
        }
      });

      // Reset form fields (optional)
      setFormData({
        compid: id,
        compName: company,
        licensePlate: '',
        vehicleType: '',
        ownerName: '',
        phone: '',
        startTime: arrivalDate,
        endTime: departureDate
      });
    } catch (error) {
      console.error('Error booking the slot:', error.message);
    }
  };
  return (
    <div style={styles.container}>
      <h2>Book Parking Slot</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
  <label htmlFor="licensePlate" style={styles.label}>License Plate:</label>
  <input
    type="text"
    id="licensePlate"
    name="licensePlate"
    value={formData.licensePlate}
    onChange={handleChange}
    required
    style={styles.input}
  />
</div>
<div style={styles.inputGroup}>
  <label htmlFor="vehicleType" style={styles.label}>Vehicle Type:</label>
  <input
    type="text"
    id="vehicleType"
    name="vehicleType"
    value={formData.vehicleType}
    onChange={handleChange}
    required
    style={styles.input}
  />
</div>
<div style={styles.inputGroup}>
  <label htmlFor="ownerName" style={styles.label}>Owner Name:</label>
  <input
    type="text"
    id="ownerName"
    name="ownerName"
    value={formData.ownerName}
    onChange={handleChange}
    required
    style={styles.input}
  />
</div>
<div style={styles.inputGroup}>
  <label htmlFor="phone" style={styles.label}>Phone:</label>
  <input
    type="text"
    id="phone"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    required
    style={styles.input}
  />
</div>
<div style={styles.inputGroup}>
  <label htmlFor="startTime" style={styles.label}>Start Time:</label>
  <input
    type="datetime-local"
    id="startTime"
    name="startTime"
    value={formData.startTime}
    onChange={handleChange}
    style={styles.input}
  />
</div>
<div style={styles.inputGroup}>
  <label htmlFor="endTime" style={styles.label}>End Time:</label>
  <input
    type="datetime-local"
    id="endTime"
    name="endTime"
    value={formData.endTime}
    onChange={handleChange}
    style={styles.input}
  />
</div>
  
<button type="submit" style={styles.button}>Book Slot</button>

      </form>
    </div>
  );
};
export default Bookit;
const styles = {
  container: {
    margin: '20px auto', // Center horizontally
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    maxWidth: '400px', // Reduced width
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '5px', // Add margin to the bottom of the label
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%', // Make input fields occupy full width
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
