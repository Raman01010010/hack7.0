const express=require('express')
const app=express()
const path=require('path')
const {logger}=require('./middleware/logEvents')
const errorHandler=require('./middleware/errorHandler')
const cors=require('cors')
const corsOption=require('./config/corsOptions')
const verifyJWT=require('./middleware/verifyJWT')
const cookieParser=require('cookie-parser')
const credentials = require('./middleware/credential')

const { initSocket } = require("./Socs");
const PORT=process.env.PORT||3500
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
//const twilio=require('./config/twillioConfig')
connectDB();


app.use(logger)



app.use(cors(corsOption))


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

app.use('/user',require('./routes/user'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))
app.use('/data',require('./routes/manageData'));
//
app.use('/user1', require('./routes/userUpdate'));
app.use('/park', require('./routes/parking'));
app.use('/slot',require('./routes/slots'))
app.use('/alert2',require('./routes/alert2'))

app.use('/req', require('./routes/verify'));
app.use('/req', require('./routes/verify'));
app.use('/delete',require('./routes/verify'));
app.use('/accept',require('./routes/verify'));
app.use('/notif',require('./routes/verify'));
app.use('/check',require('./routes/verify'));

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
   
})

app.use(errorHandler)
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
   server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    initSocket(server);
});
