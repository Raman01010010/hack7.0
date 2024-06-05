import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import image1 from '../utility/pexels-pok-rie-33563-1004409.jpg'; // Adjust the path to your image
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { User } from "../context/User";
import VerificationModal from './modal'; // Import the Modal component

const Verify = () => {
  const axios = useAxiosPrivate();
  const { newUser } = useContext(User);
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [data, setData] = useState({
    verified: true,
    time_duration: {
      startTime: "",
      endTime: ""
    },
    _id: "",
    licensePlate: "",
    vehicleType: "",
    ownerName: "",
    phone: "",
    company: "",
    key: ""
  });
  const [data2, setData2] = useState({
    verified: false,
  });
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const handleSubmit = async (event) => {
    console.log("pressed");
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('/park/verify', {
        keyentered: key,
        email: newUser.email,
      });
      console.log(response);
      if (response.status === 200) {
        const { isPresent, vehicleDetails } = response.data;
        if (isPresent) {
          // Update data here with the vehicleDetails object
          setData(vehicleDetails);
          setModalOpen(true); // Open the modal when data is verified
        } else {
          setData2({ verified: false });
        }
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('error in verifying:', error.message);
    }
  };
  const styles = {
    container: {
      position: 'relative',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: 'auto',
      textAlign: 'center',
      overflow: 'hidden', // Hide overflow to prevent blurry edges
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      filter: 'blur(5px)', // Apply blur effect
      backgroundImage: `url(${image1})`, // Use the imported image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Add a semi-transparent overlay
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.5rem',
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ced4da',
      fontSize: '1rem',
      outline: 'none',
    },
    icon: {
      position: 'absolute',
      right: '0.75rem',
      fontSize: '1.25rem',
      color: '#6c757d',
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonIcon: {
      marginLeft: '0.5rem',
    },
    heading: {
      marginBottom: '2rem',
      fontSize: '2rem',
      color: '#343a40',
    },
  };

  return (
    <>
      <div style={styles.backgroundImage}></div>
      <div style={styles.container}>
        <div style={styles.overlay}>
          <h1 style={styles.heading}>Verification</h1>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter the key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>
              Search
              <FaSearch style={styles.buttonIcon} />
            </button>
          </form>
        </div>
      </div>
      {/* Render the modal component */}
      <VerificationModal open={modalOpen} onClose={() => setModalOpen(false)} data={data} />
    </>
  );
};

export default Verify;
