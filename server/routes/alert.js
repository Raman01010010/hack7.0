const express=require('express')
const router=express()
const alertController=require('../controllers/alertController')
//const loginLimiter=require('../middleware/loginLimiter')
router.post('/send',alertController.send)
router.post('/add',alertController.add)
module.exports=router