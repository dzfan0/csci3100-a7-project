// load the User Model schema for use (USer is the model name)
const User = require("../models/User.js");
// create a router object instead of using app.get()
const router = require("express").Router();

//change user's password (put method: is to update user's password with the new one)
router.put("/:email", async (req,res) =>{
        // if user wants to update his password and it is the same as the URL link given 
        try{
            const user=await User.findOne({"email": req.body.email});
            user.password=req.body.password;
            await user.save();
            res.status(200).json("Account has been updated");
        }
        catch (err){
            //cannot find the user email on the database
            return res.status(500).json(err) 
        }
});

//delete user (HTTP delete method: is to delete a resource from the server)
router.delete("/:id", async (req,res) =>{
    //verify if the request userId is the same as the link /id or whether user is Admin 
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try{
            //delete user by his userId
            const user=await User.findByIdAndDelete({_id: req.params.id});
            res.status(200).json("Account has been deleted");
        }
        catch (err){
            return res.status(500).json(err) 
        }
    } else {
        // HTTP 403 Forbidden, user are restricted to get this resources.
        return res.status(403).json("You can delete only your account!");
    }
});
//get a user by localhost:8800/users?username=peter or localhost:8800/users?userId=123213213213 (HTTP get method is to request a resource from the server)
router.get("/", async (req,res) =>{
    const userId =req.query.userId;
    const username=req.query.username;
    try{
        const user=userId ? await User.findById(userId) : await User.findOne({username:username});
        // do not send the user password and the update time to a get request.
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other);
    }
    catch (err){
        res.status(500).json(err);
    }

})

//get friends (followings)
router.get("/friends/:userId", async(req,res) =>{
    try {
        const user=await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId=>{
                return User.findById(friendId)
            })
        )
        let friendList =[];
        friends.map(friend=>{
            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture});
        });
        res.status(200).json(friendList);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//follow a user
router.put("/:id/follow", async (req,res)=>{
        //req.body.userId: current userId
        //req.params.id: the userid that you want to follow
    if(req.body.userId !== req.params.id){
        try{
            // find the user by req.params.id
            const user =await User.findById(req.params.id);
            // find the current user by req.body.userId
            const currentUser= await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                // the current User has not yet been a follower of the user
                await user.updateOne({$push:{followers: req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(200).json("user has been followed");
            }
            else{
                //it means that the current user has been a followe of the user
                res.status(403).json("you already follow this user.");
            }
        } catch (err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow yourself")
    }
})
//unfollow a user
router.put("/:id/unfollow", async (req,res)=>{
    //req.body.userId: current userId
    //req.params.id: the userid that you want to follow
if(req.body.userId !== req.params.id){
    try{
        // find the user by req.params.id
        const user =await User.findById(req.params.id);
        // find the current user by req.body.userId
        const currentUser= await User.findById(req.body.userId);
        if(user.followers.includes(req.body.userId)){
            // the current User has been a follower of the user
            // the current user wants to unfollow the user
            await user.updateOne({$pull:{followers: req.body.userId}});
            await currentUser.updateOne({$pull:{followings:req.params.id}});
            res.status(200).json("user has been unfollowed");
        }
        else{
            res.status(403).json("you don't follow this user.");
        }
    } catch (err){
        res.status(500).json(err);
    }
}else{
    res.status(403).json("You cannot unfollow yourself")
}
})

module.exports =router