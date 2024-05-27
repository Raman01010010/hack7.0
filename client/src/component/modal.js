import { Modal, Typography, Button } from '@mui/material';

const VerificationModal = ({ open, onClose, data }) => {
    console.log(data)
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>
          Vehicle Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          License Plate: {data.licensePlate}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Vehicle Type: {data.vehicleType}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Owner Name: {data.ownerName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Phone: {data.phone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Start Time: {data.time_duration.startTime}
        </Typography>
        <Typography variant="body1" gutterBottom>
          End Time: {data.time_duration.endTime}
        </Typography>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default VerificationModal;