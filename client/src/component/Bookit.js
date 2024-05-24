import React, { useContext, useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from "../context/User";

const Bookit = () => {
  const { arrivalDate,departureDate } = useContext(User);

  const { companyId } = useParams(); // Get the company ID from URL params
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Company ID:', companyId);
    console.log('Form Data:', formData);
    // Reset form fields if needed
    setFormData({
      licensePlate: '',
      vehicleType: '',
      ownerName: '',
      phone: '',
      startTime: '',
      endTime: ''
    });
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
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
          />
        </div>
        <button type="submit">Book Slot</button>
      </form>
    </div>
  );
};

export default Bookit;
