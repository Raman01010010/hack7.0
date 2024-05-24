import React from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketPDF from './TicketPDF'; // Import the TicketPDF component

const Ticket = () => {
  const location = useLocation();
  const { formData, companyId, bookingKey } = location.state;

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
      <p><strong>Booking Key:</strong> {bookingKey}</p>
      
      {/* Add a PDF download link */}
      <PDFDownloadLink document={<TicketPDF formData={formData} companyId={companyId} bookingKey={bookingKey} />} fileName="ticket.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default Ticket;
