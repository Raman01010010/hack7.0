const Accidents = require('../model/Accidents.js');
const SafetyNumber=require('./../model/Relative.js')
const alertservice=require('./../config/twillioConfig.js')
const client=alertservice.client
const send = async (req, res) => {
    try {
      // Assuming you have a user's phone number in the request body
      const phoneNumber = req.body.phoneNumber;
  
      // Send SMS alert using Twilio
      await client.messages.create({
        body: 'This is an emergency alert!',
        from: twilioPhoneNumber,
        to: phoneNumber
      });
  
      res.status(200).json({ message: `Alert sent to ${phoneNumber}` });
    } catch (error) {
      console.error('Error sending SMS:', error);
      res.status(500).json({ message: 'Error sending SMS' });
    }
  }


const add =
    async (req, res) => {
        console.log(req.body)
        try {
            const { name, phoneNumber, relationship, notes,user } = req.body;

            const safetyNumber = new SafetyNumber({
                name,
                phoneNumber,
                user,
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