// // require("dotenv").config();
// // const app = require("./app");
// // const sequelize = require("./src/config/database");

// // const PORT = process.env.PORT || 4000;

// // app.listen(PORT, async () => {
// //   console.log(`Server running on ${PORT}`);

// //   try {
// //     await sequelize.authenticate();
// //     console.log("DB Connection Is OK !!");
// //   } catch (error) {
// //     console.error("DB Connection Failed:", error.message);
// //   }
// // });
// require("dotenv").config();
// const app = require("./app");
// const sequelize = require("./src/config/database");

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, async () => {
//   console.log(`Server running on port ${PORT}`);

//   try {
//     await sequelize.authenticate();
//     console.log("DB Connection Is OK !!");
//   } catch (error) {
//     console.error("DB Connection Failed:", error.message);
//   }
// });

const express = require('express');
const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => console.log("✅ DB Connected Successfully"))
  .catch(err => console.error("❌ DB Connection Failed:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
