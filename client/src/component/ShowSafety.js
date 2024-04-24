import * as React from 'react';

import AddAlertIcon from '@mui/icons-material/AddAlert';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState,useRef } from 'react';

import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


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
            <div id="map" style={{ height: 'calc(50vh)', width: '100%' }}></div>
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

export default function ShowSafety() {
    const axios = useAxiosPrivate()
    const [checked, setChecked] = React.useState(['wifi']);
    const [position, setPosition] = useState([0, 0]);
    const [error, setError] = useState(null);
    const position1 = [22.171841, 76.065422]
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/alert/get", {});
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData(); // Call the async function immediately

    }, []);
 
 

    return (
        <>
 <div>
    <div>
<GeolocationComponent/>

</div>
    </div>
            
                    {data.map((item) => {
                        return (
                            <div
                                class="  p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <div className='flex justify-between'>
                                    <div class="mr-4 ">
                                        <img alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg"
                                            class="relative inline-block h-12 w-12 !rounded-full  object-cover " />
                                    </div>
                                    <div>
                                        <h6
                                            class="block font-sans mr-4 text-base antialiased font-semibold tracking-normal text-blue-gray-900">
                                            {item.name}
                                        </h6>
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                            {item.relationship}

                                        </p>

                                    </div>

                                    <Button variant="contained">Alert<AddAlertIcon /></Button>

                                </div>
                            </div>

                        )
                    })}


                </>
    );
}