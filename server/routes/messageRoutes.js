const express=require('express');
const router=express.Router();
const {addMessage,getMessage} = require('../controllers/messages');

router.route('/getmsg').post(getMessage);
router.route('/addmsg').post(addMessage)

module.exports=router;