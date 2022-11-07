require("dotenv").config()

const express = require("express")
const User = require("./model/user");
const app = express();



app.get("/", (req, res) => {
    res.send("<h1> Hi there </h1>")
});

app.post("/signup",  async (req, res) => {
  const { firstname, lastname, email, password } =  req.body;

  if (!(email && password && firstname && lastname)) {
    res.status(400).send("All files are required");
  }
  const extuser= await User.findOne(email)

  
}); 
module.exports = app;