const Accidents = require('../model/Accidents.js');
const SafetyNumber=require('./../model/Relative.js')
const alertservice=require('./../config/twillioConfig.js')
const nodemailer=require("nodemailer")

const client=alertservice.client
const send = async (req, res) => {
    try {
      // Assuming you have a user's phone number in the request body
      const phoneNumber = req.body.phoneNumber;
  
      // Send SMS alert using Twilio
      await client.messages.create({
        body: 'This is an emergency alert!',
        from: '+12563447753',
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
            const { name, phoneNumber, relationship, notes,user,email } = req.body;

            const safetyNumber = new SafetyNumber({
                name,
                phoneNumber,
                user,
                relationship,
                notes,
                email
            });

            if((!phoneNumber)&&(!email)){
                res.status(400).json({ message: "Please use valid email or phone"});
                return;
            }
            const savedSafetyNumber = await safetyNumber.save();
            res.status(201).json(savedSafetyNumber);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    const sendEmail=async(subjects,message,send_to,send_from,reply_to)=>{
    //    await sendEmail("",otp5,email,"",email)
        const transporter =nodemailer.createTransport({
    
            host:process.env.HOST,
            port:"587",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS,
            },
            tls:{
                rejectUnauthorized:false,
            }
    
        })
        const options={
            from:"collegeconnect121@gmail.com",
            to:send_to,
            replyTo:reply_to,
            subject:"One time password for College Connect",
            html:`<h1>Welcome to college connct </h1>
            <h2>Connect with your college friends and interact with them at one place </h2>Your otp for login is ${message}`
        }
        //send email
        transporter.sendMail(options,function(err,info){
            if(err){
                console.log("error email send",err)
            }else{
                console.log(info)
            }
        })
    }
    module.exports=sendEmail



module.exports = { send,add };