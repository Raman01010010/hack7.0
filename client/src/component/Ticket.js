import React from 'react';
import { useLocation } from 'react-router-dom';

const Ticket = () => {
  const location = useLocation();
  const { formData, companyId } = location.state;

  return (
    <div>
      <h2>Booking Confirmation</h2>
      <p>Your booking has been successfully completed.</p>
      <h3>Booking Details</h3>
      <p><strong>Company ID:</strong> {companyId}</p>
      <p><strong>License Plate:</strong> {formData.licensePlate}</p>
      <p><strong>Vehicle Type:</strong> {formData.vehicleType}</p>
      <p><strong>Owner Name:</strong> {formData.ownerName}</p>
      <p><strong>Phone:</strong> {formData.phone}</p>
      <p><strong>Start Time:</strong> {formData.startTime}</p>
      <p><strong>End Time:</strong> {formData.endTime}</p>
    </div>
  );
};

export default Ticket;
