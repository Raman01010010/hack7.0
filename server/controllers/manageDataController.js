const Accidents = require('../model/Accidents.js');

const addData = async (req, res) => {
    try {
        const { name, address, latitude, longitude, discription } = req.body;

        
        const newAccident = new Accidents({
            name,
            address,
            latitude,
            longitude,
            discription
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