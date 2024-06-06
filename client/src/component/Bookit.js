import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from "../context/User";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Box, CircularProgress, LinearProgress } from "@mui/material";

const Bookit = () => {
  const axios = useAxiosPrivate();
  const { arrivalDate, departureDate, newUser } = useContext(User);
  const { id, company } = useParams();
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast("Successful! Redirecting to the page!");

      const response = await axios.post('/park/bookit', formData);
      if (response.status !== 200) {
        throw new Error('Failed to book the slot');
      }
      console.log('Booking successful:', response.data);

      navigate('/ticket', {
        state: {
          formData,
          companyId: id,
          bookingKey: response.data.key
        }
      });
      setLoading(false);

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
      setLoading(false);
    }
  };

  const [amount, setAmount] = useState(350);

  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:3500/api/payment/order", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ amount })
      });

      const data = await res.json();
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: "rzp_test_pVw2xUhCDTWUUw",
      amount: data.amount,
      currency: data.currency,
      name: "SafeNet",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch("http://localhost:3500/api/payment/verify", {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          });

          const verifyData = await res.json();
          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
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

        <button
          type="button"
          onClick={handlePayment}
          className="mb-5 w-full bg-[#1B9CFC] text-white py-2 px-4 rounded-md hover:bg-[#1781cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B9CFC]"
        >
          Pay ₹ 10
        </button>

        {loading ? (
          <Box sx={{ width: '100%', height: '20px' }}>
            <LinearProgress color="secondary" sx={{ height: '5vh' }} />
          </Box>
        ) : (
          <button type="submit" style={styles.button}>Book Slot</button>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Bookit;

const styles = {
  container: {
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    maxWidth: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%',
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
