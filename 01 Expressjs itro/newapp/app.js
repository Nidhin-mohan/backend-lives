const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
 res.status(200).send("Welcome");
 
});

app.get("/stop", (req, res) => {
  res.status(200).send("stop  ");
});

app.get("/v1/tweet",(req,res) => {
  const tweet = {
    userName : "Nidhin",
    follower : 11,
    following : 111
  };

  res.status(201).json({tweet})
} )

app.get("/api/v1/:token", (req, res) => {
  console.log(req.params.token);
  res.status(200).json({ param: req.params.token });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
