const { Vehicle, ParkingLot } = require('../model/Parking');

const addparkinglot = async (req, res) => {
    try {
        const { parkingLotName, location, timestart, timeend, totalSlots } = req.body;

        // Create a new ParkingLot instance
        const newParkingLot = new ParkingLot({
            parkingLotName,
            location,
            timestart, // Concatenate start and end times for duration
            timeend,
            totalSlots
        });

        // Save the parking lot details to the database
        const savedParkingLot = await newParkingLot.save();
        console.log("viv", savedParkingLot);
        res.status(201).json(savedParkingLot); // Respond with the saved parking lot details
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
const bookparking = async (req, res) => {
    try {
        const { licensePlate, vehicleType, ownerName,phone} = req.body;
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

module.exports = { addparkinglot ,bookparking};
