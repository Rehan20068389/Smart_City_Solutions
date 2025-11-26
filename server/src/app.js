const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const carRoute = require("./routes/cars");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/cars", carRoute);

module.exports = app;
