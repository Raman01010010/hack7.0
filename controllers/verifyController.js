const Request = require('../model/request.js');
const Suser = require('../model/Suser.js');
const Notif = require('../model/Notif.js');

const upload = async (req, res) => {
    const { imgurl, email } = req.body;
    // console.log("mai aa gya ",  imgurl, "ndkjndjnd", email) 
    
    const newRequest = new Request({
        imgurl: imgurl,
        email: email
    });
    
    try {   
        const savedRequest = await newRequest.save();
        console.log('Request saved successfully:', savedRequest);
        res.status(200).json({ message: 'Request saved successfully' });
    } catch (error) {
        console.error('Error saving request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getreqdata = async (req, res) => {
    
    try {
        const requestData = await Request.find(); 
        res.status(200).send(requestData);
    } catch (error) {
        console.error('Error fetching request data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const reject = async (req, res) => {
    try {
        const email = req.body.currentCardData.email;
        console.log("Mai aa gya ", email);
        
        // Delete one request with the given email
        const deletedRequest = await Request.findOneAndDelete({ email: email });

        if (deletedRequest) {
            // Find the notification document for the given email
            let notif = await Notif.findOne({ email: email });
            if (notif) {
                // Add the rejection message to the notifications array
                notif.notifications.push(`${email} Your verification request has been rejected`);
                await notif.save();
            } else {
                // Create a new notification document if it does not exist
                notif = new Notif({
                    email: email,
                    notifications: [`${email} Your verification request has been rejected`]
                });
                await notif.save();
            }

            // Respond with the deleted request
            res.json({ deletedRequest });
        } else {
            // If no request was found to delete, respond with an appropriate message
            res.status(404).json({ error: "Request not found" });
        }
    } catch (error) {
        console.error("Error in reject:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const accept = async (req, res) => {
    const email = req.body.currentCardData.email;

    console.log("Mai aa gya ", email);

    const newSuser = new Suser({
        email: email
    });

    try {
        // Save the new Suser to the database
        await newSuser.save();

        // Delete one request with the given email
        const deletedRequest = await Request.findOneAndDelete({ email: email });
        if(deletedRequest){
              // Find the notification document for the given email
              let notif = await Notif.findOne({ email: email });

              if (notif) {
                  // Add the rejection message to the notifications array
                  notif.notifications.push(`${email} Your verification request has been accepted`);
                  await notif.save();
              } else {
                  // Create a new notification document if it does not exist
                  notif = new Notif({
                      email: email,
                      notifications: [`${email} Your verification request has been accepted`]
                  });
                  await notif.save();
              }
        }
        // If no request was found and deleted, send a 404 response
        if (!deletedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }
        // Respond with the deleted request and the new Suser
        res.json({ deletedRequest, newSuser });
    } catch (error) {
        console.error("Error in accept:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getnotif = async (req, res) => {
    try {
        const email = req.body.email;

        // Fetch the notification document for the given email
        const notif = await Notif.findOne({ email: email });

        if (notif) {
            // Extract the notifications array from the document
            const notifArray = notif.notifications;

            // Send the notifications array in the response
            res.json(notifArray);
        } else {
            // Send an empty array if no notifications are found
            res.json([]);
        }
    } catch (error) {
        console.error("Error in getnotif:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const check = async (req, res) => {
    try {
        // Query the database to find all users
        const userExists = await Suser.find();
        
        // Ensure the response is always an array
        const response = Array.isArray(userExists) ? userExists : [userExists];
        
        // Send the response as a JSON array
        res.json(response);
    } catch (error) {
        // Log the error with a stack trace for better debugging
        console.error("Error in check:", error.stack);
        
        // Check if the error is a known type and send a more specific status code and message
        if (error.name === 'MongoNetworkError') {
            res.status(503).json({ error: "Service Unavailable. Please try again later." });
        } else {
            // Send a 500 Internal Server Error response with a JSON error message
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
module.exports = {upload,getreqdata,reject,accept,getnotif,check}