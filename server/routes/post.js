const express=require('express');
const router=express.Router();
const mongoose = require('mongoose')
const requireLogin= require('../middleware/requireLogin')
const Post=require('../models/post')


router.get('/allpost',requireLogin, async (req,res)=>{
    try {
        const posts = await Post.find().populate("postedBy","_id name").populate("comments.postedBy","_id name").sort('-createdAt').limit(6);
        res.send({posts});
        return;
    } catch (error) {
    }
   
    
})

router.get('/getsubpost',requireLogin,(req,res)=>{
    
    Post.find({ postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    // .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
    
})
 



router.post('/postcreate',requireLogin,async (req,res)=>{
    const {title,body,pic} = req.body 
    if(!title || !body || !pic){
      res.send({error:"Please add all the fields"})
      return;
    }
    // req.user.password = 
    console.log(req.user);
    const post = await new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user._id
    })
    post.save().then(result=>{
        res.json({post:result})
    })

    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost', requireLogin, async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.user._id })
            .populate('postedBy', '_id name')
            .sort('-createdAt');

        console.log(posts);
        res.json({ mypost: posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/like', requireLogin, async (req, res) => {
    try {
        console.log(req.user);

        const result = await Post.findByIdAndUpdate(
            req.body.postId,
            {
                $push: { likes: req.user._id },
            },
            {
                new: true,
            }
        )
            .populate('postedBy', '_id name ')
            .exec();
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.post('/unlike',requireLogin,async(req,res)=>{
    console.log(req.user)
    try {
    const result = await Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec()

    console.log(result);
    res.json(result);
    } catch (error) {
        console.log(error);
    }
})


router.post('/comment', requireLogin, async (req, res) => {
    try {
        console.log(req.body);

        const comment = {
            text: req.body.text,
            postedBy: req.user._id,
        };

        const result = await Post.findByIdAndUpdate(
            req.body.postId,
            {
                $push: { comments: comment }
            },
            {
                new: true,
            }
        )
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec();

        res.json(result);
    } catch (err) {
        console.error(err);
        res.send({ error: 'Internal Server Error' });
    }
});


router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    console.log(req.body)
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
         res.status(422).json({error:err})
         return
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})
module.exports=router;
