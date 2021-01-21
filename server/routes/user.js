const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User")

router.get('/user/:id', requireLogin , (req, res)=>{
    User.findOne({_id: req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy: req.params.id})
        .populate("postedBy", "_id name")
        .exec((err, posts)=>{
            if(err) return res.status(422).json({error: err})
            else res.json({user, posts})
        })
    })
    .catch(err=>{
        return resizeBy.status(404).json({error: "User not found"})
    })
})

router.put('/follow', requireLogin, (req, res)=>{
    User.findByIdAndUpdate(req.body.toFollowId, {
        $push: {followers: req.user._id}
    }, {
        new: true
    }, (err, result)=>{
        if(err) return res.status(422).json({error: err})

        User.findByIdAndUpdate(req.user._id, {
            $push: {following: req.body.toFollowId}},
            {new : true})
            .select("-password")
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                return res.status(422).json({error: err})
            })
    })
})


router.put('/unfollow', requireLogin, (req, res)=>{
    User.findByIdAndUpdate(req.body.toUnfollowId, {
        $pull: {followers: req.user._id}
    }, {
        new: true
    }, (err, result)=>{
        if(err) return res.status(422).json({error: err})

        User.findByIdAndUpdate(req.user._id, {
            $pull: {following: req.body.toUnfollowId}},
            {new : true})
            .select("-password")
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                return res.status(422).json({error: err})
            })
    })
})



module.exports = router;
