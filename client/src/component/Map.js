import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const triangleIcon = L.divIcon({
    className: 'custom-marker',
    iconSize: [20, 20],
    html: '<div class="w-0 h-0 border-solid border-t-4 border-l-4 border-r-4 border-b-0 border-transparent border-black"></div>'
  });

const Map = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const mapContainer = document.getElementById('map');
        if (!mapContainer || mapRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const map = L.map(mapContainer).setView([51.505, -0.09], 3);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    const locations = [
                        { latitude: 40.7128, longitude: -74.006, accidents: 10 },
                        { latitude: 34.0522, longitude: -118.2437, accidents: 5 },
                        { latitude: 41.8781, longitude: -87.6298, accidents: 15 },
                        // Add more locations with accident data
                    ];

                    const getMarkerColor = (accidents) => {
                        const colorScale = ['#ff0000', '#00ff00'];
                        const maxAccidents = Math.max(...locations.map(loc => loc.accidents));
                        const minAccidents = Math.min(...locations.map(loc => loc.accidents));
                        const range = maxAccidents - minAccidents;
                        const index = Math.round(((accidents - minAccidents) / range) * (colorScale.length - 1));
                        return colorScale[index];
                    };
                    locations.forEach(({ latitude, longitude, accidents }) => {
                        const markerColor = getMarkerColor(accidents);
                        const marker = L.marker([latitude, longitude], {
                            icon: L.divIcon({
                                className: 'custom-marker',
                                iconSize: [20, 20],
                                html: `<div class="w-0 h-0 border-solid border-t-4 border-l-4 border-r-4 border-b-0 border-transparent" style="border-color: ${markerColor};"></div>`
                            })
                        }).addTo(map);
                        marker.bindPopup(`Latitude: ${latitude}, Longitude: ${longitude}, Accidents: ${accidents}`);
                    });

                    mapRef.current = map;
                    observer.unobserve(mapContainer);
                }
            });
        });

        observer.observe(mapContainer);

        return () => {
            observer.disconnect();
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

export default Map;
