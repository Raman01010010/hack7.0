const express=require('express')
const router=express()
const alertController=require('../controllers/alertController')
//const loginLimiter=require('../middleware/loginLimiter')
router.post('/',alertController.send)
module.exports=router