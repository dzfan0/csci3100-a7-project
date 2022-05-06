const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{ 
        //min 3 characters and max 20 characters for the username
        type:String,
        require: true,
        min:3,
        max:20,
        unique:true
    },
    email:{ 
        // max 50 characters for email address
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        // min 6 characters for password
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    desc:{
        type:String,
        max: 50
    },
    city:{
        type:String,
        max: 50,
        default: "Hong Kong"
    },
    from:{
        type:String,
        max:50,
        default: "Hong Kong"
    },
    education:{
        // I use enum type for representing the education level
        // By default, it will be secondary students (2)
        type: Number,
        enum: [1,2,3],
        default:2 // secondary student
    },
    verified:{
        // For Email Verification purpose
        type:Boolean,
        default:false
    },
    token:{
        // For Email Verification purpose
        type:String,
    }


},
// create a timestamp so that it will update the timestamps whenever we have created a new user.
{timestamps:true} 
);
//To export this module so that we can use the UserSchema in user.js and auth.js
// User is the model name 
module.exports =mongoose.model("User", UserSchema);