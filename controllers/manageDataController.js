const Accidents = require('../model/Accidents.js');

const addData = async (req, res) => {
    try {
        const { name, address, latitude, longitude,date, description } = req.body;

        

// Original date string
const originalDateString = date;

// Create a new Date object from the original string
const originalDate = new Date(originalDateString);

// Extract year, month, and day from the original date
const year = originalDate.getFullYear();
// Month is 0-indexed, so we add 1 to get the correct month
const month = originalDate.getMonth() + 1;
const day = originalDate.getDate();

// Format the new date string as "YYYY-MM-DD"
const formattedDateString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

console.log(formattedDateString); // Output: "2024-04-09"










        const newAccident = new Accidents({
            name,
            date:formattedDateString,
            address,
            latitude,
            longitude,
            description
        });

        await newAccident.save();

        res.status(200).json({ message: "Accident data saved successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while saving the accident data" });
    }
};
const getData = async (req, res) => {
  try {
      // Fetch accidents data
      const accidents = await Accidents.find();

      // Create an object to store latitude and longitude as keys and frequency as values
      const coordinatesMap = {};

      // Iterate through accidents to populate coordinatesMap
      accidents.forEach(accident => {
          const { latitude, longitude } = accident;
          const key = `${latitude},${longitude}`;
          coordinatesMap[key] = coordinatesMap[key] ? coordinatesMap[key] + 1 : 1;
      });
      // Convert coordinatesMap to an array of objects
      const coordinatesArray = Object.entries(coordinatesMap).map(([coordinates, accidents]) => {
          const [latitude, longitude] = coordinates.split(',');
          return {
              latitude,
              longitude,
              accidents
          };
      });

      res.status(200).json(coordinatesArray);
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while fetching the accident data" });
  }
}


const getData1d = async (req, res) => {
    try {
        // Aggregate to group accidents by date and count occurrences
        const addressArray = await Accidents.aggregate([
            {
                $group: {
                    _id: "$date",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    accidents: "$count"
                }
            }
        ]);
        console.log("Address Array:", addressArray); // Log the address array
        res.status(200).json(addressArray);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getData1m = async (req, res) => {
  try {
      // Fetch all accidents from the database
      const accidents = await Accidents.find();

      // Initialize an object to store the frequency of accidents for each month
      const monthFrequency = {};

      // Count the occurrences of accidents for each month
      accidents.forEach((accident) => {
          const date = new Date(accident.date);
          const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Format: YYYY-MM
          monthFrequency[month] = (monthFrequency[month] || 0) + 1;
      });

      // Convert the monthFrequency object to an array of objects
      const monthFrequencyArray = Object.entries(monthFrequency).map(([month, accidents]) => ({
          month,
          accidents
      }));

      res.json(monthFrequencyArray);
  } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {addData,getData,getData1d,getData1m};