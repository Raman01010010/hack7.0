import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

function PathMap({ path }) {
  return (
    <MapContainer center={path[0]} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
}

export default PathMap;
