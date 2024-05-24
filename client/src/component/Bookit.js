import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from "../context/User";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Bookit = () => {
  const axios = useAxiosPrivate();
  const { arrivalDate, departureDate } = useContext(User);
  const { id, company } = useParams(); // Get the company ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    compid: id,
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
    console.log("Submitting form with data:", formData);
    try {
      const response = await axios.post('/park/bookit', formData);
      if (response.status !== 200) {
        throw new Error('Failed to book the slot');
      }
      console.log('Booking successful:', response.data);
      // Navigate to the ticket page with form data
      navigate('/ticket', { state: { formData, companyId: id } });
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
    <div>
      <h2>Book Parking Slot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="licensePlate">License Plate:</label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <input
            type="text"
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ownerName">Owner Name:</label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Book Slot</button>
      </form>
    </div>
  );
};

export default Bookit;
