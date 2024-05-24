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
    const alert = await Alert.findById(alertId).populate('user','name email');

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
        from: "20223177.gdscmnnit.24@gmail.com",
        to: send_to,
        replyTo: reply_to,
        subject: "SAFE NET ALERT",
        html:` <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background:#048c88;
       
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr style="height: 0;">
              <td>
              
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; color: #ffffff;"
                  >${new Date()}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
             EMERGENCY ALERT
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              HELLO!!
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
            ${message}
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #ba3d4f;
              "
            >
          REACH NOW!!
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:20223177.gdscmnnit.24@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >20223177.gdscmnnit.24@gmail.com</a
          >
          or visit our
          <a
            href=""
            target="_blank"
            style="color: #499fb6; text-decoration: none;"
            >Help Center</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          SafeNet Team
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
         MNNIT ALAHABAD
        </p>
        <div style="margin: 0; margin-top: 16px;">
          <a href="" target="_blank" style="display: inline-block;">
            <img
              width="36px"
              alt="Facebook"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
          /></a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Twitter"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Youtube"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
          /></a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © ${new Date().getFullYear()} SAFENet. All rights reserved.
        </p>
      </footer>
    </div>
  </body>`
        
        // `<h1>Welcome to SafeNet </h1>
        //     <h2> ${message}</h2>`
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