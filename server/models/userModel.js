const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min: 5,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    }
})

module.exports = mongoose.model('User',userSchema);