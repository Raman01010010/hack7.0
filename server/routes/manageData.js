const express=require('express')
const router=express()

const manageDataController=require('../controllers/manageDataController')

router.post('/addData',manageDataController.addData);
router.post('/getData',manageDataController.getData);

module.exports=router