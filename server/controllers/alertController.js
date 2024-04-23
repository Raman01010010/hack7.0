const Accidents = require('../model/Accidents.js');
const SafetyNumber=require('./../model/Relative.js')
const send = async (req, res) => {

}


const add =
    async (req, res) => {
        console.log(req.body)
        try {
            const { name, phoneNumber, relationship, notes } = req.body;

            const safetyNumber = new SafetyNumber({
                name,
                phoneNumber,
                relationship,
                notes
            });

            const savedSafetyNumber = await safetyNumber.save();
            res.status(201).json(savedSafetyNumber);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }




module.exports = { send,add };