const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const mongoose=require('mongoose')
const User= require('../models/user')


module.exports=(req,res,next)=>{

   

    const{authorization}=req.headers
    if(!authorization){
          res.send({error:"you must be logged in"})
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            res.send({error:"you must be logged in"})
        }
        const {_id}=payload
        User.findById(_id).then(userdata=>{
            console.log(userdata);
            req.user=userdata
            next()
        });
    })
}