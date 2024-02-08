const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

require('dotenv').config()

// console.log(process.env.ACCESS_TOKEN_SECRET)


// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@micromarket-cluster.dcpj4zc.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(
    console.log("MongoDB Connected Successfully!")
  )
  .catch((error) => console.log("Error connecting to MongoDB", error));


   // jwt authentication
   app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token});
  })



// import route here
const userRoutes = require('./api/routes/userRoutes')
app.use('/users', userRoutes);

app.get("/", (req, res) => {
  res.send("Hello micro-market Client Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});