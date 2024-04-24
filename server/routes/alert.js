const express=require('express')
const router=express()
const alertController=require('../controllers/alertController')
//const loginLimiter=require('../middleware/loginLimiter')
router.post('/send',alertController.send)
router.post('/add',alertController.add)
router.post('/get',alertController.getAll)
router.post('/getAlert',alertController.getAlert)
module.exports=router