import React from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketPDF from './TicketPDF'; // Import the TicketPDF component

const Ticket = () => {
  const location = useLocation();
  const { formData, companyId, bookingKey } = location.state;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Booking Confirmation</h2>
      <p style={styles.paragraph}>Your booking has been successfully completed.</p>
      <div style={styles.detailsContainer}>
        <h3 style={styles.subHeading}>Booking Details</h3>
        <p><strong>Company ID:</strong> {companyId}</p>
        <p><strong>License Plate:</strong> {formData.licensePlate}</p>
        <p><strong>Vehicle Type:</strong> {formData.vehicleType}</p>
        <p><strong>Owner Name:</strong> {formData.ownerName}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Start Time:</strong> {formData.startTime}</p>
        <p><strong>End Time:</strong> {formData.endTime}</p>
        <p><strong>Booking Key:</strong> {bookingKey}</p>
      </div>
      {/* Add a PDF download link */}
      <PDFDownloadLink document={<TicketPDF formData={formData} companyId={companyId} bookingKey={bookingKey} />} fileName="ticket.pdf">
        {({ blob, url, loading, error }) => (
          <button style={styles.downloadButton}>{loading ? 'Loading document...' : 'Download PDF'}</button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  paragraph: {
    marginBottom: '20px',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  detailsContainer: {
    marginBottom: '20px',
  },
  subHeading: {
    marginBottom: '10px',
    fontSize: '20px',
    color: '#333',
  },
  downloadButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Ticket;
