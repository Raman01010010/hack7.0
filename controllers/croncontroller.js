// cronJobs.js
const cron = require('node-cron');
const mongoose = require('mongoose');
const { Vehicle, ParkingLot,TimeSlot } = require('../model/Parking');

// Function to check for expired vehicles and remove them
// Function to check for expired vehicles and remove them
const removeExpiredVehicles = async () => {
    try {
        // Get the current date and time
        const currentDate = new Date();
        console.log("Current date and time:", currentDate);

        // Query for expired vehicles where endTime is less than or equal to the current date and time
        const expiredVehicles = await Vehicle.find({}).lean(); // Using lean() to get plain JS objects

        // Remove each expired vehicle
        for (const vehicle of expiredVehicles) {
            // Convert the end time string to a Date object
            const endTime = new Date(vehicle.time_duration.endTime);
            console.log("End time for vehicle:", endTime);

            // Compare the end time with the current date and time
            if (endTime <= currentDate) {
                await Vehicle.deleteOne({ _id: vehicle._id });
                await ParkingLot.updateOne({ _id: vehicle.company }, { $pull: { vehiclesParked: vehicle._id } });
                console.log(`Expired vehicle removed successfully: ${vehicle._id}`);
                
                // Delete matching time slots based on licensePlate and vehicleType
                await TimeSlot.deleteMany({ licensePlate: vehicle.licensePlate, vehicleType: vehicle.vehicleType });
                console.log(`Time slots for vehicle ${vehicle.licensePlate} with type ${vehicle.vehicleType} removed successfully.`);
            } else {
                console.log(`Vehicle with ID ${vehicle._id} is not expired yet.`);
            }
        }
        console.log('Expired vehicles removal completed.');
    } catch (error) {
        console.error('Error removing expired vehicles:', error.message);
    }
};



module.exports = { removeExpiredVehicles };


// Schedule the task to run every hour
// cron.schedule('0 * * * *', removeExpiredVehicles);

