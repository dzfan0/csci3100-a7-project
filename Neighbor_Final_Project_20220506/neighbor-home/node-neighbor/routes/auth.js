// create a router object instead of using app.get()
const router = require("express").Router();
// load the User Model Schema for use (User is the model name)
const User = require("../models/User.js") // .. denotes back to the parent directory
const nodemailer =require('nodemailer') // we use nodemailer for sending email
const {google} = require('googleapis') // here we will use the Google API for sending gmails
//Below are just some necessary keys for us to use the Google API for sending gmails in node.js
//Sometimes, the emails we sent to user may be considered as junk emails,and user can just need to configure this email as "not junk" to open the link embedded inside the email.
const CLIENT_ID= '1055399476029-3p5a1ic43cvhubanadanbbc99erlbhpf.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04ITE20WR2K0ACgYIARAAGAQSNwF-L9IrNsB9eDZ4eTXJdFBteuDcyJS5kgQX7EclpbiHv5qsalWEjx6x5REZvmnjjSKDK25RBIU'

const oAuth2Client =new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
// Sending Registration Email
async function sendRegistrationMail(client, clientemail, clienttoken){
    try{
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type: 'OAuth2',
                user:'3100neighbor@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const mailOptions={
            from:'Neighbor <3100neighbor@gmail.com>',
            to: clientemail,
            subject: "Neighbor - Email Verification",
            text: 'Thanks for your registration',
            html: `<h5><b>Hello, ${client}.</b></h5>
                   <p>Thanks for your registration. You have requested an account opening on Neighbor. Please click <a href='http://localhost:3000/verify-email?token=${clienttoken}'>this link</a> for verification.</p>
                   <p>If you have any problem in registeration process, please don't hesitate to contact us through <a href="mailto:3100neighbor@gmail.com">our email</a>.</p>
                   <h5>Yours Sincerely,</h5>
                   <h5>Neighbor Production Team</h5>
            `
        };
        const result = await transport.sendMail(mailOptions)
        return result
    }
    catch(err){
        return err
    }
}
// send ChangePasswordEmail when user requires to change his password.
async function ChangePasswordMail(clientemail){
    try{
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type: 'OAuth2',
                user:'3100neighbor@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const mailOptions={
            from:'Neighbor <3100neighbor@gmail.com>',
            to: clientemail,
            subject: "Neighbor - Change Your Password",
            text: 'Thanks for your request',
            html: `
                   <p>Thanks for your request. Please click <a href='http://localhost:3000/user/${clientemail}'>this link</a> for changing password.</p>
                   <p>If you have any problem in changing password, please don't hesitate to contact us through <a href="mailto:3100neighbor@gmail.com">our email</a>.</p>
                   <h5>Yours Sincerely,</h5>
                   <h5>Neighbor Production Team</h5>
            `
        };
        const result = await transport.sendMail(mailOptions)
        return result
    }
    catch(err){
        return err
    }
}
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
  We use both res.json and res.send in our project.
*/
//send ChangePassword Route in put request
router.put("/:email",async (req,res)=>{
    try{
        console.log(req.body.email);
        await ChangePasswordMail(req.body.email).then(result=>console.log('Email sent...', result)).catch(error=>console.log(error.message))
    }
    catch(err){
        console.log(err);
    }
})

//REGISTER by post request
router.post("/register", async (req,res)=>{
    try{
        // create an instance of User (Model) by new
        // newUser is a object of model User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            token: "welcometocsci3100neighbornewuser"
        });
        // insert a new user into database
        // object.save() is to save the changes to the database 
        const user = await newUser.save();
        const token= "welcometocsci3100neighbornewuser"
        // send a registration email to user
        await sendRegistrationMail(req.body.username,req.body.email,token).then(result=>console.log('Email sent...', result)).catch(error=>console.log(error.message))
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
        if(user.verified==false){
            res.status(400).json("Please verify your account through email.");
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