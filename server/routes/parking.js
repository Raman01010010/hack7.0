const express=require('express')
const router=express()

const parkingcontroller=require('../controllers/parkingController')
// console.log("hhhhhhhhhhhh");
router.post('/addcomp',parkingcontroller.addparkinglot);
router.post('/book',parkingcontroller.bookparking);


module.exports=router