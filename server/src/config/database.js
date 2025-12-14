// require('dotenv').config();
// const { Sequelize } = require("sequelize");

// module.exports = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: false
//   }
// );

require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // 🔴 REQUIRED for Railway
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
