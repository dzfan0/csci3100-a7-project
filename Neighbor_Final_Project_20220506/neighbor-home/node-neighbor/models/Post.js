// Define the Post Schema in MongoDB
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
{
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    }
},
// create a timestamp so that it will update the timestamps whenever we have created a new post.
{timestamps:true} 
);
//To export this module so that we can use the PostSchema in user.js and auth.js
// Post is the model name 
module.exports =mongoose.model("Post", PostSchema);