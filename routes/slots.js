const express=require('express')
const router=express()
const slotController=require('../controllers/slotController')
//const loginLimiter=require('../middleware/loginLimiter')
// router.post('/send',alertController.send)
// router.post('/add',alertController.add)
// router.post('/get',alertController.getAll)
// router.post('/getAlert',alertController.getAlert)
router.post('/book',slotController.book)
router.post('/booked',slotController.booked)
module.exports=router