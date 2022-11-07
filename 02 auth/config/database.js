const mongoose = require("mongoose")
const {MONGO_URL} = process.env


exports.connect = () => {

    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(console.log (`DB connection succes`))
    .catch(error => {
console.log(` DB connection failed`)
console.log(error)
process.exit(1)
    }) 


}