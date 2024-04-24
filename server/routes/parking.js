const express=require('express')
const router=express()

const parkingcontroller=require('../controllers/parkingController')
// console.log("hhhhhhhhhhhh");
router.post('/addcomp',parkingcontroller.addparkinglot);
router.post('/book',parkingcontroller.bookparking);
router.post('/takeout',parkingcontroller.takeoutVehicle);
router.post('/takein',parkingcontroller.takeinVehicle);
router.post('/showdata',parkingcontroller.showdata);



module.exports=router