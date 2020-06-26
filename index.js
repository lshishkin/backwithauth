const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const user = require("./routes/user"); //new addition
const contact = require("./routes/contact"); //new addition
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

app.use(cors())

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});


/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use("/contact", contact);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
