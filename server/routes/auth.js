const express = require('express');
const router=express.Router();

const User= require('../models/user')
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require('../keys')
const requireLogin=require('../middleware/requireLogin')




router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello")
})




router.post('/signup',(req,res)=>{
    const{name,email,password,pic}=req.body;

    if(!email||!password||!name){
       return res.send({error:"please add all the fields"});
    }
    




    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
          return res.send({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const user = new User({
                  email,
                  password:hashedpassword,
                  name,
                  pic:pic
                  
              })
      
              user.save()
              .then(user=>{
                  
                  res.json({message:"saved successfully"})
              })
              .catch(err=>{
                  console.log(err)
              })
        })
       
    })
    .catch(err=>{
      console.log(err)
    })

  })


  router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.send({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.send({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,followers,following,pic} = savedUser
               res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.send({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}) 
module.exports=router;