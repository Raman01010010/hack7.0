const { Vehicle, ParkingLot,TimeSlot } = require('../model/Parking');
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
        console.log("Fetching coordinates");
        const apiKey = '55810e9a0db5484fae278428320f9add';
        const encodedAddress = encodeURIComponent(address);
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;
        
        const response = await axios.get(url);

        if (response.data.results && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            console.log("Coordinates:", lat, lng);
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

    if (!address || !start || !departure) {
        return res.status(400).json({ message: "Address, start, and departure are required fields" });
    }

    console.log(req.body);

    try {
        console.log("Processing request");

        const startTime = new Date(start);
        const endTime = new Date(departure);

        if (isNaN(startTime) || isNaN(endTime)) {
            throw new Error("Invalid date format");
        }

        console.log("Start Time:", startTime, "End Time:", endTime);

        const { lat, lng } = await getcoordinate(address);
        console.log("Coordinates:", { lat, lng });

        // Define the search radius in radians (e.g., 2 km)
        const radiusInRadians = 2000 / 6378.1;
        
        const parkingLots = await ParkingLot.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], radiusInRadians]
                }
            }
        });

        const vacantParkingLots = [];

        for (const parkingLot of parkingLots) {
            const totalSlots = parkingLot.totalSlots;
            
            const bookedVehicles = await Vehicle.find({
                parkingLot: parkingLot._id,
                'time_duration.startTime': { $lt: endTime },
                'time_duration.endTime': { $gt: startTime }
            });

            const bookedSlots = bookedVehicles.length;

            if (bookedSlots < totalSlots) {
                vacantParkingLots.push(parkingLot);
            }
        }

        console.log("Available Parking Lots:", vacantParkingLots);
        res.json({ availableParkingLots: vacantParkingLots });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// const takeinVehicle = async (req, res) => {
//     try {
//         const { licensePlate, compid } = req.body;

//         // Find the parking lot by compid and remove the vehicle with the given licensePlate
//         const parkingLot = await ParkingLot.findOneAndUpdate(
//             { compid },
//             { $pull: { vehiclesParked: { licensePlate } } },
//             { new: true }
//         );
//         const updatedVehicle = await Vehicle.findOneAndUpdate(
//             { licensePlate },
//             { 
//                 $set: { 
//                     status: 'Taken In',
//                 } 
//             },
//             { new: true }
//         );

//         res.status(200).json({ message: 'Vehicle taken in successfully', parkingLot, updatedVehicle });
//     } catch (error) {
//         res.status(500).json({ message: error.message }); // Handle errors
//     }
// };
// const takeoutVehicle = async (req, res) => {
//     try {
//         const { licensePlate, compid } = req.body;
//         const parkingLot = await ParkingLot.findOneAndUpdate(
//             { compid },
//             { $pull: { vehiclesParked: { licensePlate } } },
//             { new: true }
//         );
//         const updatedVehicle = await Vehicle.findOneAndUpdate(
//             { licensePlate },
//             { 
//                 $set: { 
//                     status: 'Taken Out',
//                 } 
//             },
//             { new: true }
//         );
//         res.status(200).json({ message: 'Vehicle taken out successfully', parkingLot, updatedVehicle });
//     } catch (error) {
//         res.status(500).json({ message: error.message }); // Handle errors
//     }
// };
const bookparking = async (req, res) => {
    console.log("stage1");
    try {
      const { licensePlate, vehicleType, ownerName, phone, compid, startTime, endTime, userid } = req.body;
      const key = generateVerificationKey();
      const parkingLot = await ParkingLot.findById(compid);
      console.log("parkinglotfound");
      
      if (!parkingLot) {
        return res.status(404).json({ message: 'Parking lot not found' });
      }
      
      const newVehicle = new Vehicle({
        licensePlate,
        vehicleType,
        ownerName,
        phone,
        company: compid,
        key,
        time_duration: {
          startTime,
          endTime
        }
      });
      
      const savedVehicle = await newVehicle.save();
      console.log("vehicle saved");
      console.log(key,"kkkkkkkkkk")
      const newItem = new TimeSlot({
        licensePlate,
        vehicleType,
        ownerName,
        phone,
        company: compid,
        key,
        startTime,
        endTime,
        date: new Date(), // assuming current date for simplicity, adjust as needed
        booked: true,
        bookedBy: userid, // assuming you have user info in req.user
        parkingProvider: compid,
      });
  
      try {
        const savedTimeSlot = await newItem.save();
        console.log("item saved");
        parkingLot.vehiclesParked.push(savedVehicle);
        await parkingLot.save();
        console.log("finally done")
        res.status(200).json({ message: 'Vehicle booked successfully', vehicle: savedVehicle, key });
      } catch (saveTimeSlotError) {
        console.error("Error saving TimeSlot:", saveTimeSlotError.message);
        res.status(500).json({ message: 'Error saving TimeSlot', error: saveTimeSlotError.message });
      }
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
module.exports = { addparkinglot ,bookparking,showdata};
