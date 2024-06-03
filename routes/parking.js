const express=require('express')
const router=express()
const parkingcontroller=require('../controllers/parkingController')
// console.log("hhhhhhhhhhhh");
router.post('/addcomp',parkingcontroller.addparkinglot);
router.post('/bookit',parkingcontroller.bookparking);
// router.post('/takeout',parkingcontroller.takeoutVehicle);
router.post('/verify',parkingcontroller.verifykey);
router.post('/showdata',parkingcontroller.showdata);
router.post('/isparking',parkingcontroller.isParking);

module.exports=router