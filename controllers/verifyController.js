const Request = require('../model/request.js');

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

module.exports = {upload}