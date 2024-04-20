import React from 'react';

const ShowRoad = () => {
    const data = [
        [{ longitude: 40.7128, latitude: -74.0060 }, 0.85], // Index 0
        [{ longitude: 34.0522, latitude: -118.2437 }, 0.92], // Destination at index n
        [{ longitude: 51.5074, latitude: -0.1278 }, 0.78],
    ];
  
    const generateGoogleMapsUrl = () => {
        // Get the coordinates of current location and destination
        const currentLocation = `${data[0][0].latitude},${data[0][0].longitude}`;
        const destination = `${data[data.length - 1][0].latitude},${data[data.length - 1][0].longitude}`;
        // Construct the Google Maps URL with current location and destination
        return `https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=${currentLocation}&destination=${destination}`;
    };

    // Function to open Google Maps with the route
    const goToMap = () => {
        window.open(generateGoogleMapsUrl(), '_blank');
    };

    return (
        <div>
            <div className="mt-20 bg-neutral-400 mx-auto p-4 max-w-5xl border border-2 border-black rounded-lg">
                <div className="max-h-96 overflow-y-auto">
                    {/* Display a button to show the route on Google Maps */}
                    <button
                        className="text-slate-950 font-bold"
                        onClick={goToMap}
                    >
                        Show Route on Google Maps
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShowRoad;
