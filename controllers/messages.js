const messageModel= require('../models/msgModel')
module.exports.addMessage=async(req,res,next)=>{
    try{
        const {users,sender,message}=req.body; 
        const data= await messageModel.create({
            message,
            users,
            sender
        })
        
        if(data) return res.status(201).send(data);
         return res.status(401).send("failed to create message");
    }
    catch(err){
        next(err);
    }
}
module.exports.getMessage=async(req,res,next)=>{
    try{
        const {from, to } = req.body;
        const messages= await messageModel.find({
            users:{
                $all:[from,to],
            },
        }).sort({updatedAt:1})
        res.status(200).send(messages)
    }
    catch(err){
        next(err);
    }
}
