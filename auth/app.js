require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var cookieParser = require("cookie-parser");


// custom middleware

const auth = require('./middleware/auth')

//import model - User
const User = require("./model/user")



const  app = express()
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("hello auth system");
})

app.post("/register", async (req, res) => {
    try {
      //collecting all information from body
      const { firstname, lastname, email, password } = req.body;

      // validate the data
      if (!(email && password && lastname && firstname)) {
        res.status(401).send("ALL fields are required");
      }

      //check if user exist or not 
      const existingUser = await User.findOne({email})

      if(existingUser){
        res.status(401).send("User alreasy found in database")
      }

      //encrypting the password

      console.log('password:', password)

      const myEncryPassword = await bcrypt.hash(password,10)

      console.log("encrypted password",myEncryPassword)


     
      console.log(User)

      //create a new entry in database
      const user= await User.create({
        firstname,
        lastname,
        email,
        password:myEncryPassword
      })

      // create a token and sent it to user

      const token = jwt.sign({
        id:user._id, email
      }, 'shhhh', {expiresIn: '2h'})

      user.token = token

      //dont want to send the password

      user.password = undefined
      user.lastname = undefined

       console.log(User);
       console.log(user)

      res.status(201).json(user)

      

    }
    
    catch (error) {
      console.log(error);
    }
})







app.post ("/login", async (req, res) => {
  try{
    //collected information from frontend

    const {email , password} = req.body;

    //validate
    if (!(email && password)) {
      res.status(401).send("email and password is required")
    }

    //check user in databbase

    const user = await User.findOne({email})


    //if user does not exist 

    if(!user){
      res.status(401).send("user does not exist");
    }

    //match password

    if(user &&  (await bcrypt.compare(password,user.password))) {
      const token = jwt.sign({ id: user._id, email }, "shhhh", {
        expiresIn: "2h",
      });

      user.password = undefined
      user.token = token

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly:true
      }
      res.status(200).cookie("token", token, options).json({
        success:true,
        token,
        user
      })

    }

    //create token and send

    res.sendStatus(400).send("email or password is incorrect")

  }
  catch(error){
    console.log(error)
  }
})

app.get("/dashboard", auth , (req, res) => {
  res.send("welcome to dashboard")
})



module.exports = app;