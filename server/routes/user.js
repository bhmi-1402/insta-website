const express=require('express');
const router=express.Router();
const mongoose = require('mongoose')
const requireLogin= require('../middleware/requireLogin')
const Post=require('../models/post')
const User=require('../models/user')

router.get('/user/:id', requireLogin, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await Post.find({ postedBy: req.params.id })
            .populate("postedBy", "_id name")
            .exec();

        res.json({ user, posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.post('/follow', requireLogin, async (req, res) => {
    try {
        
        const followedUser = await User.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true }
        );

        if (!followedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        
        const currentUser = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true }
        );

        res.json(currentUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
});


router.post('/unfollow', requireLogin, async (req, res) => {
    try {
        // Update the user being unfollowed
        const unfollowedUser = await User.findByIdAndUpdate(
            req.body.unfollowId,
            { $pull: { followers: req.user._id } },
            { new: true }
        ).select("-password");

        if (!unfollowedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the current user's following list
        const currentUser = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: req.body.unfollowId } },
            { new: true }
        ).select("-password");

        res.json(currentUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/updatepic',  async (req, res) => {
    console.log("here",req.body)
    const {userID,pic} = req.body;
    try {
        
        const updatedUser = await User.findByIdAndUpdate(userID,{
            pic : pic
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp('^'+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })
})








module.exports=router;