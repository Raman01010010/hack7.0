const express=require('express')
const router=express()

const manageDataController=require('../controllers/manageDataController')

router.post('/addData',manageDataController.addData);
router.post('/getData',manageDataController.getData);
router.post('/getData1d',manageDataController.getData1d);
router.post('/getData1m',manageDataController.getData1m);

module.exports=router