const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const carRoute = require("./routes/cars");
const cookRoutes = require("./routes/cooks");
const app = express();
app.use(cors());


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/cars", carRoute);
app.use("/api/cooks", cookRoutes);

module.exports = app;
