import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const TicketPDF = ({ formData, companyId, bookingKey }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Booking Confirmation</Text>
        <Text>Your booking has been successfully completed.</Text>
      </View>
      <View style={styles.section}>
        <Text>Booking Details</Text>
        <Text>Company ID: {companyId}</Text>
        <Text>License Plate: {formData.licensePlate}</Text>
        <Text>Vehicle Type: {formData.vehicleType}</Text>
        <Text>Owner Name: {formData.ownerName}</Text>
        <Text>Phone: {formData.phone}</Text>
        <Text>Start Time: {formData.startTime}</Text>
        <Text>End Time: {formData.endTime}</Text>
        <Text>Booking Key: {bookingKey}</Text>
      </View>
    </Page>
  </Document>
);

export default TicketPDF;
