const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
{
   members:{
       type:Array,
   },
},
// create a timestamp so that it will update the timestamps whenever we have create a new user.
{timestamps:true} 
);
//To export this module so that we can use the ConversationSchema in user.js and auth.js
// Conversation is the model name 
module.exports =mongoose.model("Conversation", ConversationSchema);