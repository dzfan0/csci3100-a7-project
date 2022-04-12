// create a router object instead of using app.get()
const router = require("express").Router();
// load the User Model Schema for use (User is the model name)
const User = require("../models/User.js") // .. denotes back to the parent directory (NEIGHBOR_20220403 folder)

// async + await is to allow the function to run synchronously
/* async function () {
        //first it will execute the try {}
        //if there is no error inside the try{}, then it will ignore the catch (err){}
        //However, if try{} has error, then it will ignore the rest of statements inside try{} and execute the catch block
        try{
            await function is to wait the function
            it means that it will wait until the function has executed successfully
            otherwise, it will block the program
        }
        catch (err){

        }
} */

/*res.json(): passing a object or array as a parameter for sending message as a response
  res.send(): passing any data type for sending a message as a response
  In general, they do not have big differences.
*/

//REGISTER by post request
router.post("/register", async (req,res)=>{
    try{
        // create an instance of User (Model) by new
        // newUser is a object of model User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        // insert a new user into database
        // object.save() is to save the changes to the database 
        const user = await newUser.save();
        // writing the status code and sending json message (in json format)
        res.status(200).json(user);
    } catch (err){
        // HTTP 500 Internal Server Error
        res.status(500).json(err);
    }
});


//LOGIN
router.post("/login", async (req,res) =>{
    try{
        //Model.findOne: Retrieve at most one instance
        // we try to find a user with the matched email, since email is unique
        const user = await User.findOne({email: req.body.email});
        // if no user can be found, then return 404 not found and send a message to user.
        !user && res.status(404).json("user not found");

        //we also need to compare user password inside the database with the res.body.password
        //status code 400 means bad request (client side error)
        if(req.body.password !== user.password){
            res.status(400).json("wrong password");
        }
        

        // if both email and password are correct
        // send status code 200 (OK)
        // as well as show user details in JSON format
        res.status(200).json(user);
    } catch (err){
        // HTTP 500 Internal Server Error
        res.status(500).json(err);
    }
});


module.exports =router