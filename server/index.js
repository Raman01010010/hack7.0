const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOption = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credential');
const cron = require('node-cron');
const { removeExpiredVehicles } = require('./controllers/croncontroller'); // Adjust the path as necessary
require('dotenv').config();

const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
//const twilio=require('./config/twillioConfig')
connectDB();

app.use(logger);

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/user',require('./routes/user'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))
app.use('/data',require('./routes/manageData'));
//
app.use('/park', require('./routes/parking'));
app.use('/user1',require('./routes/userUpdate'))
app.use(verifyJWT)

app.use('/alert',require('./routes/alert'))

app.all('/*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.send('404 PAGE NOT FOUND')
    }
    else if(req.accepts('json')){
        res.json({error:'404 page not found'})
    }else{
        res.type('txt').send('404 page not found')
    }
});
app.use(errorHandler);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Schedule the task to run every hour
cron.schedule('0 * * * *', () => {
    removeExpiredVehicles(); // Call the function inside the cron job

    console.log('This task will run every 15 minutes');
  });