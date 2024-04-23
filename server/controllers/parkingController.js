const { Vehicle, ParkingLot } = require('../model/Parking');
const generateVerificationKey = require('../utils/generateVerificationKey'); // Import function to generate verification key
const addparkinglot = async (req, res) => {
    try {
        const { parkingLotName, location, timestart, timeend, totalSlots } = req.body;
        // Create a new ParkingLot instance
        const newParkingLot = new ParkingLot({
            parkingLotName,
            location,
            timestart, 
            timeend,
            totalSlots
        });
        const savedParkingLot = await newParkingLot.save();
        console.log("viv", savedParkingLot);
        res.status(201).json(savedParkingLot); 
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
const takeoutVehicle = async (req, res) => {
    try {
        const { licensePlate, compid } = req.body;
        // Find the parking lot by company ID and update the vehiclesParked array
        const parkingLot = await ParkingLot.findOneAndUpdate(
            { compid },
            { $pull: { vehiclesParked: { licensePlate } } }, // Remove vehicle with given licensePlate
            { new: true }
        );
        // Update the status of the vehicle in the Vehicle schema
        const updatedVehicle = await Vehicle.findOneAndUpdate(
            { licensePlate },
            { $set: { status: 'Taken Out' } }, // Set status to 'Taken Out'
            { new: true }
        );

        res.status(200).json({ message: 'Vehicle taken out successfully', parkingLot, updatedVehicle });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
const bookparking = async (req, res) => {
    try {
        const { licensePlate, vehicleType, ownerName, phone, compid } = req.body;
        
        // Generate verification key
        const key = generateVerificationKey();
        
        // Create a new Vehicle instance with verification key
        const newVehicle = new Vehicle({
            licensePlate,
            vehicleType,
            ownerName,
            phone,
            key // Add verification key to the vehicle schema
        });
        
        const savedVehicle = await newVehicle.save();
        
        const parkingLot = await ParkingLot.findOneAndUpdate(
            { compid },
            { $push: { vehiclesParked: savedVehicle._id } },
            { new: true }
        ).populate('vehiclesParked');
        
        res.status(201).json({ message: 'Vehicle booked successfully', vehicle: savedVehicle, key });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

module.exports = { addparkinglot ,bookparking,takeoutVehicle};
