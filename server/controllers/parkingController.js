const { Vehicle, ParkingLot } = require('../model/Parking');
const {TimeSlot} = require('../model/timeSlotSchema');
const axios = require('axios');


const generateVerificationKey = require('../utils/generateVerificationKey'); // Import function to generate verification key
const addparkinglot = async (req, res) => {
    try {
        const { parkingLotName, locationType,latitude,longitude, firstName, lastName, phone, email, totalSlots } = req.body;
        // Extract location coordinates from the request body
        console.log(req.body);

        // Create a new ParkingLot object according to the schema
        const newParkingLot = new ParkingLot({
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            parkingLotName: parkingLotName,
            firstName: firstName,
            lastName: lastName,
            totalSlots: totalSlots,
            phone: phone,
            email: email
        });
        console.log(newParkingLot);
        const savedParkingLot = await newParkingLot.save();
        console.log("viv", savedParkingLot);
        // Send the saved ParkingLot object in the response
        res.status(201).json(savedParkingLot); 
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};





const getcoordinate = async (address) => {
    try {
        const apiKey = '55810e9a0db5484fae278428320f9add';
        const encodedAddress = encodeURIComponent(address);
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;
        
        const response = await axios.get(url);

        if (response.data.results && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            return { lat, lng };
        } else {
            throw new Error('No results found for the address');
        }
    } catch (error) {
        throw new Error(`Failed to get coordinates for address: ${error.message}`);
    }
};

const showdata = async (req, res) => {
    const { address, start, departure } = req.body;
    console.log(req.body);

    try {
        console.log("entered");

        // Convert start and departure times to Date objects if they are not already
        const startTime = new Date(start);
        const endTime = new Date(departure);
        console.log(startTime, " vivej  ", endTime);

        // Get coordinates for the provided address
        const { lat, lng } = await getcoordinate(address);
        console.log({ lat, lng });

        // Find all parking lots within a certain radius from the provided address
        const radiusInRadians = 2000 / 6378.1;        console.log("fffffff")
        // console.log(ParkingLot)
        
        const parkingLots = await ParkingLot.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], radiusInRadians]
                }
            }
        });
        
        console.log("fssssssssssss")
      console.log(parkingLots,"viiiiii")
      const vacantParkingLots = [];

      for (const parkingLot of parkingLots) {
        const totalSlots = parkingLot.totalSlots;
        
        // Find all vehicles parked in this parking lot within the given time range
        const bookedVehicles = await Vehicle.find({
            parkingLot: parkingLot._id,
            'time_duration.startTime': { $lt: endTime },
            'time_duration.endTime': { $gt: startTime }
        });

        // Calculate the total booked slots in the given time range
        const bookedSlots = bookedVehicles.length;

        // Check if the total booked slots are less than the total slots of the parking lot
        if (bookedSlots < totalSlots) {
            vacantParkingLots.push(parkingLot);
        }
    }

        console.log(vacantParkingLots);
        res.json({ availableParkingLots: vacantParkingLots });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
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

module.exports = { addparkinglot ,bookparking,takeoutVehicle,takeinVehicle,showdata};
