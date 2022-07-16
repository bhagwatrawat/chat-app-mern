const User= require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports. register =async (req,res,next)=>{
   
        const {username,email,password} = req.body;
        const hashedPassword= await bcrypt.hash(password,10);
        User.create({
            username,
            email,
            password: hashedPassword,
        })
        .then(data=>{
            delete data.password;
            res.status(201).send(data);
        })
        .catch(err=>{
            // res.status(500).json({message: "username or email already exists"});
            next(err);
        })
    
}
module.exports.login =async (req,res,next)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username}).select([
        "email",
        "username",
        "password",
        "_id"
    ]);
    if(!user){
        return res.status(401).send("username or password is incorrect");
    }
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(401).send("password is incorrect");
    }
    return res.status(200).send(user)
}
module.exports.getAllUsers =async (req,res,next)=>{
    try{
        const users= await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "_id"
        ]);
        return res.status(200).send(users);
    }
    catch(err){
        next(ex);
    }
}