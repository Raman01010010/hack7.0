const Accidents = require('../model/Accidents.js');
const SafetyNumber = require('../model/Relative.js');
const alertService = require('../config/twillioConfig.js');
const nodemailer = require("nodemailer");
const Alert = require('../model/alert.js'); // Import the Alert model
const client = alertService.client;
const User = require('../model/User');

const getAlert=async(req,res)=>{
    const alertId = req.body.id;

  try {
    // Find the alert by ID in the database
    const alert = await Alert.findById(alertId);

    if (!alert) {
      // If no alert found with the provided ID, return 404 Not Found
      return res.status(404).json({ error: 'Alert not found' });
    }

    // If alert found, return it in the response
    res.json(alert);
  } catch (error) {
    // If an error occurs during database query, return 500 Internal Server Error
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const send = async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const message = req.body.message;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    console.log(req.userid)
    try {

        //req.userid="658d45c616bae47d92b240d0";
        // Save alert details in the database
        const newAlert = new Alert({
            user: req.userid,
            message: message,
            latitude: latitude,
            longitude: longitude
        });
        const res1 = await newAlert.save(); // Save the alert document
        console.log(res1);
        const res2 = await User.find({ _id: req.userid });
        console.log(res2)
        // Send SMS alert using Twilio
        if (phoneNumber) {
            await client.messages.create({
                body: 'This is an emergency alert from ' + res2[0].name + '. Email: ' + res2[0].email + '. The person can be found at http://localhost:3000/watch/' + res1._id + ' !',

                from: '+12563447753',
                to: `+91${phoneNumber}`
            });
        }

        // Send email alert using Nodemailer
        if (email) {
            await sendEmail("", 'This is an emergency alert from ' + res2[0].name + '. Email: ' + res2[0].email + '. The person can be found at'+process.env.URL+'/watch/' + res1._id + '!', "rmnprjrrr@gmail.com", "", "rmnprjrrr@gmail.com");
        }

        res.status(200).json({ message: `Alert sent to ${phoneNumber}` });
    } catch (error) {
        console.error('Error sending alert:', error);
        res.status(500).json({ message: 'Error sending alert' });
    }
}



const add =
    async (req, res) => {
        console.log(req.body)
        try {
            const { name, phoneNumber, relationship, notes, user, email } = req.body;

            const safetyNumber = new SafetyNumber({
                name,
                phoneNumber,
                user,
                relationship,
                notes,
                email
            });

            if ((!phoneNumber) && (!email)) {
                res.status(400).json({ message: "Please use valid email or phone" });
                return;
            }
            const savedSafetyNumber = await safetyNumber.save();
            res.status(201).json(savedSafetyNumber);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


const sendEmail = async (subjects, message, send_to, send_from, reply_to) => {
    //    await sendEmail("",otp5,email,"",email)
    const transporter = nodemailer.createTransport({

        host: process.env.HOST,
        port: "465",
        secure: true,

        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }

    })
    const options = {
        from: "collegeconnect121@gmail.com",
        to: send_to,
        replyTo: reply_to,
        subject: "One time password for College Connect",
        html: `<h1>Welcome to SafeNet </h1>
            <h2> ${message}</h2>`
    }
    //send email
    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log("error email send", err)
        } else {
            console.log(info)
        }
    })
}
const getAll = async (req, res) => {
    try {
        // Extract user ID from request parameters
        req.userid="658d45c616bae47d92b240d0"
        const userId = req.userid;

        // Query the database to find safety numbers associated with the user ID
        const safetyNumbers = await SafetyNumber.find({ user: userId });

        // If no safety numbers found for the user ID, return appropriate response
        if (!safetyNumbers) {
            return res.status(404).json({ message: 'No safety numbers found for the user ID.' });
        }

        // If safety numbers found, return them as a response
        res.status(200).json(safetyNumbers);
    } catch (error) {
        // If an error occurs, return an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { send, add, getAll,getAlert };