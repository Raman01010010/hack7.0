import React, { useState, useEffect, useRef } from 'react';

import { User } from '../context/User';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Map = (props) => {
    console.log(props)
    const mapRef = useRef(null);

    useEffect(() => {
        const mapContainer = document.getElementById('map');
        if (!mapContainer || mapRef.current) return;

        // Initialize the map with a single point
        const map = L.map(mapContainer).setView([props.pos.latitude, props.pos.longitude], 10); // Set the view to New York City
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker for the single point
        const marker = L.marker([props.pos.latitude, props.pos.longitude]).addTo(map); // New York City coordinates
        // Popup text for the marker

        // Store the map instance in the ref
        mapRef.current = map;

        return () => {
            // Clean up any observers or listeners if needed
        };
    }, []);

    return (
        <div>
            <div id="map" style={{ height: 'calc(100vh - 30vh)', width: '100%' }}></div>
            <div style={{ textAlign: 'center' }}>
              
            </div>
        </div>
    );
};
const ChatBubble = ({ message, sender }) => {
    const bubbleStyles = {
      maxWidth: '60%',
      padding: '10px 15px',
      borderRadius: '20px',
      margin: '10px 0',
      display: 'inline-block',
     
      lineHeight: '1.4',
    };
  
    const senderStyles = {
      ...bubbleStyles,
      backgroundColor: '#808836',
      color: 'white',
      borderBottomRightRadius: '0px',
      alignSelf: 'flex-end',
    };
  
    const receiverStyles = {
      ...bubbleStyles,
      backgroundColor: '#e5e5ea',
      color: 'black',
      borderBottomLeftRadius: '0px',
      alignSelf: 'flex-start',
    };
  
    return (
      <div style={sender === 'me' ? senderStyles : receiverStyles}>
        {message}
      </div>
    );
  };
function GetLocation() {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alertData,setAlertData]=useState({})
    const { alertId, newUser } = useParams()
    console.log(alertId);
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.post("/alert2/getAlert", { id: alertId });
                console.log(response.data);
                setPosition(response.data);
                setAlertData(response.data)
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchData()
    }, [newUser])
    const profileContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        border: '1px solid #e5e5e5',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      };
    
      const textStyle = {
        fontSize: '20px',
        margin: '5px 0',
      };
    return (
        <div>
          
          {position && (
                <div>
                    
                    <div style={profileContainerStyles}>
                        <AccountBoxIcon style={{ fontSize: '100px', color: '#808836' }} />
      <p style={textStyle}>Sender Name: {alertData.user.name}</p>
      <p style={textStyle}>Sender Email: {alertData.user.email}</p>
      <div style={{ ...textStyle, fontSize: '24px', textAlign: 'center' }}>
        <ChatBubble message={alertData.message} sender="me" />
      </div>
    
              </div>
                </div>
            )}
            
            {position &&<><Map pos={position} /><div className='flex justify-center gap-2'><p>Latitude: {position.latitude}</p>
                    <p>Longitude: {position.longitude}</p></div></> }
          
        </div>
    );
}

export default GetLocation;
