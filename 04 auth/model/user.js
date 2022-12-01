//importing mongoose 
const mongoose = require('mongoose');


// creating schema for user

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});



module.exports = mongoose.model("user", userSchema)

/*
  inside mongodb database the user will be stored as users. mongo db pluralisese that user to users . If you use User still it will convert to users and mongo db covert that to smallercase
  
*/