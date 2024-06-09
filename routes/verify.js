const express=require('express')
const router=express()
const verifyController=require('../controllers/verifyController')


router.post('/upload',verifyController.upload);
router.get('/getreqdata',verifyController.getreqdata);
router.post('/deleteReq',verifyController.reject);
router.post('/acceptReq',verifyController.accept);
router.post('/getnotif',verifyController.getnotif);
router.post('/checkSuser',verifyController.check);

module.exports=router