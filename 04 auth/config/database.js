//mongoose
const mongoose = require('mongoose');

// url to mongodb 
const MONGO_URL = process.env.MONGODB_URL;

// connecting to database
exports.connect = () => {
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Database connected"))
    .catch((error) => {
        console.log("Database connection failed");
        console.log(error);
        process.exit(1)
    });
};

