const express=require('express');
const router=express.Router();
const {register,login,getAllUsers} = require('../controllers/users');

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/allusers/:id').get(getAllUsers);

module.exports=router;