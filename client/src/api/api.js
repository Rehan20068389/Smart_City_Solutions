// // import axios from 'axios';
// // const api = axios.create({ baseURL: 'process.env.REACT_APP_API_URL || https:smart-city-solutions-backend.onrender.com/api', });

// // api.interceptors.request.use(config => {
// //   const token = localStorage.getItem('token');
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// // export default api;


// //for deployment the changes
// import axios from "axios";

// const api = axios.create({
//   baseURL:
//     process.env.REACT_APP_API_URL ||
//     "https://smart-city-solutions-backend.onrender.com/api",
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
const express = require("express");
const cors = require("cors");
const authRoute = require("./src/routes/auth");
const carRoute = require("./src/routes/cars");
const cookRoutes = require("./src/routes/cooks");
const bookingRoutes = require("./src/routes/bookings");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local development
      "https://steady-lily-4ad3da.netlify.app" // your Netlify frontend
    ],
    credentials: true, // allows cookies/auth headers
  })
);

// Middleware
app.use(express.json());

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/cars", carRoute);
app.use("/api/cooks", cookRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;

