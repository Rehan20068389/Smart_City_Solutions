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

// Use Railway-provided environment variables
const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,    // Database name
  process.env.MYSQLUSER,        // Username
  process.env.MYSQLPASSWORD,    // Password
  {
    host: process.env.MYSQLHOST,   // Host
    port: process.env.MYSQLPORT,    // Port (usually 3306)
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
