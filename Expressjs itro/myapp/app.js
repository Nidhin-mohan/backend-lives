
const express = require("express");
const app = express()
const port = 3000;

app.get( '/', (req,res) => {
   
     res.status(200).send("why this mistake")
})

app.get("/me", (req, res) => {
  res.send(" HI check");
});

app.listen(port, () => {
    console.log(`  port ${port } is running`);
})