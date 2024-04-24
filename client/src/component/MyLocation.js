import React, { useState, useEffect,useRef } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import AddAlertIcon from '@mui/icons-material/AddAlert';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
    console.log(props)
    const mapRef = useRef(null);

    useEffect(() => {
        const mapContainer = document.getElementById('map');
        if (!mapContainer || mapRef.current) return;

        // Initialize the map with a single point
        const map = L.map(mapContainer).setView([props.pos.latitude,props.pos.longitude], 10); // Set the view to New York City
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker for the single point
        const marker = L.marker([props.pos.latitude,props.pos.longitude]).addTo(map); // New York City coordinates
        // Popup text for the marker

        // Store the map instance in the ref
        mapRef.current = map;

        return () => {
            // Clean up any observers or listeners if needed
        };
    }, []);

    return (
        <div>
            <div id="map" style={{ height: 'calc(100vh - 50px)', width: '100%' }}></div>
            <div style={{ textAlign: 'center' }}>
                <Link to="/graph" className="btn">Back to Graph</Link>
            </div>
        </div>
    );
};

function GeolocationComponent() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let locationTimeout;

    const getLocation = () => {
      console.log("raman");
      if (navigator.geolocation) {
        locationTimeout = setTimeout(getLocation, 10000);
    
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            clearTimeout(locationTimeout);
            setPosition(pos.coords);
            setLoading(false);
          },
          (err) => {
            clearTimeout(locationTimeout);
            setError(err);
            setLoading(false);
          }
        );
      } else {
        // Fallback for no geolocation
        setError({ message: 'Geolocation not supported' });
        setLoading(false);
      }
    };

    getLocation();

    return () => {
      // Cleanup function
      clearTimeout(locationTimeout);
    };
  }, []);

  return (
    <div>
        rmananan
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {position && (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
        </div>
      )}
     {position&& <Map pos={position}/>}
    </div>
  );
}

export default GeolocationComponent;
