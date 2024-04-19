import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const PathMap = ({ path }) => {
  return (
    <MapContainer center={path[0]} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        <Polyline key={1} positions={path} color={red} />
    </MapContainer>
  );
};

export default PathMap;