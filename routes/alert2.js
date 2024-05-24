const express=require('express')
const router=express()
const alertController=require('../controllers/alertController')
//const loginLimiter=require('../middleware/loginLimiter')

router.post('/getAlert',alertController.getAlert)
module.exports=router