// Create our express (node.js framework)
// require is to load modules and give access to their exports.
const express = require("express");
// Create our application
const app = express();
// add more libraries for usage
// mongoose is a library provided by node.js which is to connect mongodb
// dotenv is a npm package which can automatically loads environment variables from a .env file into the process.env file
// using Helmet is for security during requests
// morgan is used for requests process, showing the details of a request
// multer is used for dealing with uploading files to server
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require ("helmet");
const morgan =require("morgan");
const multer =require("multer");
const path = require("path")
const userRoute =require("./routes/users.js"); // link to ./routes/users.js (. means that it is current directory)
const authRoute =require("./routes/auth.js"); // link to ./routes/auth.js
const postRoute=require("./routes/posts.js"); // link to ./routes/posts.js
const conversationRoute=require("./routes/conversations.js"); // link to ./routes/conversations.js
const messageRoute=require("./routes/messages.js"); // link to ./routes/messages.js

dotenv.config();// configure the dotenv so that it is ready to use
//Connect to MongoDB with mongoose.connect() method
//process.env.MONGO_URL is the secret url to connect to Cluster0
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });
// if we cannot get /images, we can simply find from the public/images directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware: when a request hits the backend, Express will execute the functions we pass to app.use() in order.
app.use(express.json()); // it parses incoming JSON requests and puts the parsed data in req.body
app.use(helmet());// use helmet 
app.use(morgan("common")); // use Morgan for logging request details.
// Morgan ::1 - - [03/Apr/2022:06:34:47 +0000] (Date) "GET (request type) / (address) HTTP/1.1" 200 (status code: 200 is OK) 19 (duration of our response time)

const storage=multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,"public/images");
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name)
  }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
  try{
    return res.status(200).json("File uploaded successfully.");
  }
  catch(err){
    console.log(err);
  }
})


app.use("/api/users", userRoute) // /api/users is the root of users.js
app.use("/api/auth", authRoute)  // /api/auth is the root of auth.js
app.use("/api/posts", postRoute) // /api/posts is the root of posts.js
app.use("/api/conversations", conversationRoute); // /api/conversations is the root of conversations.js
app.use("/api/messages",messageRoute); // /api/messages is the root of messages.js

//Indicate how to use the application
//listen to port 8800
app.listen(8800,() =>{
    console.log("Backend server is running!")
})


