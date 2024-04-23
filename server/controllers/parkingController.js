const { Vehicle, ParkingLot } = require('../model/Parking');
const generateVerificationKey = require('../utils/generateVerificationKey'); // Import function to generate verification key
const addparkinglot = async (req, res) => {
    try {
        const { parkingLotName, location, timestart, timeend, totalSlots } = req.body;
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

const takeinVehicle = async (req, res) => {
    try {
        const { licensePlate, compid } = req.body;

        // Find the parking lot by compid and remove the vehicle with the given licensePlate
        const parkingLot = await ParkingLot.findOneAndUpdate(
            { compid },
            { $pull: { vehiclesParked: { licensePlate } } },
            { new: true }
        );
        const updatedVehicle = await Vehicle.findOneAndUpdate(
            { licensePlate },
            { 
                $set: { 
                    status: 'Taken In',
                } 
            },
            { new: true }
        );

        res.status(200).json({ message: 'Vehicle taken in successfully', parkingLot, updatedVehicle });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
const takeoutVehicle = async (req, res) => {
    try {
        const { licensePlate, compid } = req.body;
        const parkingLot = await ParkingLot.findOneAndUpdate(
            { compid },
            { $pull: { vehiclesParked: { licensePlate } } },
            { new: true }
        );
        const updatedVehicle = await Vehicle.findOneAndUpdate(
            { licensePlate },
            { 
                $set: { 
                    status: 'Taken Out',
                } 
            },
            { new: true }
        );
        res.status(200).json({ message: 'Vehicle taken out successfully', parkingLot, updatedVehicle });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

const bookparking = async (req, res) => {
    try {
        const { licensePlate, vehicleType, ownerName, phone, compid, start_time, end_time } = req.body;
        
        const key = generateVerificationKey();
        
        const parkingLot = await ParkingLot.findById(compid);
        
        if (!parkingLot) {
            return res.status(404).json({ message: 'Parking lot not found' });
        }
            const newVehicle = new Vehicle({
            licensePlate,
            vehicleType,
            ownerName,
            phone,
            company: parkingLot._id, // Set company to the parking lot's _id
            key, 
            time_duration: {
                startTime: start_time,
                endTime: end_time
            }
        });
        
        const savedVehicle = await newVehicle.save();
        
        parkingLot.vehiclesParked.push(savedVehicle._id);
        await parkingLot.save();
        
        res.status(201).json({ message: 'Vehicle booked successfully', vehicle: savedVehicle, key });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addparkinglot ,bookparking,takeoutVehicle,takeinVehicle};
