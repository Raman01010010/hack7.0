const express=require('express')
const router=express()
const verifyController=require('../controllers/verifyController')


router.post('/upload',verifyController.upload)

module.exports=router