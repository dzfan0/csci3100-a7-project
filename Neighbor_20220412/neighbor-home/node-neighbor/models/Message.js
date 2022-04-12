const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
{
   conversationId:{
       type:String,
   },
   sender:{
       type:String,
   },
   text:{
       type:String,
   },
},
// create a timestamp so that it will update the timestamps whenever we have create a new user.
{timestamps:true} 
);
//To export this module so that we can use the MessageSchema in user.js and auth.js
// Message is the model name 
module.exports =mongoose.model("Message", MessageSchema);