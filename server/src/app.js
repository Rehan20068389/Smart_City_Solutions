const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoute);

module.exports = app;
