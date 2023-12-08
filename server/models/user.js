const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    pic:{
     type:String,
     default:"https://res-console.cloudinary.com/bhoomicloud/thumbnails/v1/image/upload/v1701084890/ZGVmX3BtdTYycg==/grid_landscape"
    },
    followers:[{type:ObjectId,ref:"User"}],

    following:[{type:ObjectId,ref:"User"}]
})

const User= mongoose.model("User",userSchema);
module.exports=User;
