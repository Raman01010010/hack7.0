import React, { useState, useEffect, useRef } from 'react';

import { User } from '../context/User';

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
            <div id="map" style={{ height: 'calc(100vh - 50px)', width: '100%' }}></div>
            <div style={{ textAlign: 'center' }}>
                <Link to="/graph" className="btn">Back to Graph</Link>
            </div>
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
                const response = await axiosPrivate.post("/alert/getAlert", { id: alertId });
                console.log(response.data);
                setPosition(response.data);
                setAlertData(response.data)
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchData()
    }, [newUser])

    return (
        <div>
          
          
            {position && (
                <div>
                    <p>Latitude: {position.latitude}</p>
                    <p>Longitude: {position.longitude}</p>
                    <p>message {alertData.message}</p>
                </div>
            )}
            {position && <Map pos={position} />}
        </div>
    );
}

export default GetLocation;
