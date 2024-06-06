const express=require('express')
const router=express()
const paymentController=require('../controllers/paymentController')

router.post('/order',paymentController.order)

router.post('/verify',paymentController.verify)

module.exports=router