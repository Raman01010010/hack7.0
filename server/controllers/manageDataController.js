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
const getData = async(req,res) => {

}

module.exports = {addData,getData};