const express=require('express')
const router=express()
const registerController=require('../controllers/registerController')
const otpController=require('../controllers/otpController')
const otpController1=require('../controllers/otpController1')

router.post('/register',otpController)
router.post('/register1',otpController1)

router.post('/otp',registerController.handleNewUser)
module.exports=router