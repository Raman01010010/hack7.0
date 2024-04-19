const express=require('express')
const router=express()

const manageDataController=require('../controllers/manageDataController')

router.post('/addData',manageDataController.addData);

module.exports=router