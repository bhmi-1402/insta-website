const express=require('express');
const router=express.Router();
const mongoose = require('mongoose')
const requireLogin= require('../middleware/requireLogin')
const Post=require('../models/post')


router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    // .populate("comments.postedBy","_id name")
    // .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
    
})
 



router.post('/postcreate',requireLogin,(req,res)=>{
    const {title,body,pic} = req.body 
    if(!title || !body || !pic){
      return  res.send({error:"Please add all the fields"})
    }
    // req.user.password = 
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    // .populate("comments.postedBy","_id name")
    // .sort('-createdAt')
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
    
})
router.put('/like',(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.send({error:err})
        }
        else{
            res.json(result)
        }
    })
})



router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.send({error:err})
        }
        else{
            res.json(result)
        }
    })
})
module.exports=router;