const mongoose = require('mongoose')

const TOKEN = mongoose.Schema({
    token :{
        type:String
    },
    email:{
        type:String
    },
    userID:{
        type:String
    }
},{timestamps:true});

const Token = mongoose.model('token',TOKEN);
module.exports = Token;