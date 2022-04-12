const router =require("express").Router();
// User is the model name
const User = require("../models/User.js"); 
// Post is the model name 
const Post = require("../models/Post.js");
//create a post
router.post("/", async (req,res)=>{
    const newPost =new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err){
        res.status(500).json(err);
    }
});
//update a post
router.put("/:id", async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        // if we check that the /:id is the same as req.body.userId
        // It means that we are editing our own posts 
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("the post has been updated")
        }else{
            res.status(403).json("you can update only your post.")
        }
    } catch (err){
        res.status(500).json(err);
    }
    
})
//delete a post
router.delete("/:id", async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        // if we check that the /:id is the same as req.body.userId
        // It means that we are editing our own posts 
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("the post has been deleted")
        }else{
            res.status(403).json("you can delete only your post.")
        }
    } catch (err){
        res.status(500).json(err);
    }
    
})
//like and dislike a post
// /:id/like , the id is refering to the post id
router.put("/:id/like", async (req,res)=>{
    try{
        // find the post by /:id
        const post =await Post.findById(req.params.id);
        // if the post has not been liked by the user before
        // it will update the likes array inside the post by pushing userId into the likes Array
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}});
            res.status(200).json("The post has been liked");
        } else{
            // if the post has been liked by the user before
            // It will update the user preference 
            // Therefore, it will pull userId out of the likes Array 
            // User can then dislike this post            
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});
//get a post 
router.get("/:id", async (req,res)=>{
    try{
        const post =await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err);
    }
})
//get timeline posts
router.get("/timeline/:userId",async(req,res)=>{
    try{
        // first we need to find the currentUser by his unique Id
        const currentUser = await User.findById(req.params.userId);
        // second we need to find all posts of this currentUser
        // find is to find All  
        const userPosts = await Post.find({userId: currentUser._id});
        // third we need to find all the friend posts
        // each friend has his own timeline posts so we should use Promise.all
        const friendPosts= await Promise.all(
            currentUser.followings.map((friendId)=>{
                //for each friendId
                return Post.find({userId: friendId});
            })
        );
        // concatenate the userposts with friendPosts
        res.status(200).json(userPosts.concat(...friendPosts))
    }   
    catch(err){
        res.status(500).json(err);
    }
});

//get user's all posts
router.get("/profile/:username",async(req,res)=>{
    try{
        // find user
        const user = await User.findOne({username: req.params.username})
        const posts = await Post.find({ userId: user._id});
        res.status(200).json(posts);
       
    }   
    catch(err){
        res.status(500).json(err);
    }
});

module.exports=router