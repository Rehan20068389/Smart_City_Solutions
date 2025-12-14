// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const authRoute = require("./src/routes/auth");
// const carRoute = require("./src/routes/cars");
// const cookRoutes = require("./src/routes/cooks");
// const bookingRoutes = require("./src/routes/bookings")
// const adminRoutes = require('./src/routes/adminRoutes');

// const app = express();
// app.use(cors());


// app.use(express.json());
// app.use("/api/auth", authRoute);
// app.use("/api/cars", carRoute);
// app.use("/api/cooks", cookRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use('/api/admin', adminRoutes);

// module.exports = app;
//changes for deployment
const express = require("express");
const cors = require("cors");
const authRoute = require("./src/routes/auth");
const carRoute = require("./src/routes/cars");
const cookRoutes = require("./src/routes/cooks");
const bookingRoutes = require("./src/routes/bookings");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://steady-lily-4ad3da.netlify.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoute);
app.use("/api/cars", carRoute);
app.use("/api/cooks", cookRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
