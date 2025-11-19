require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

sequelize.sync().then(() => {
  console.log("DB synced");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on ${process.env.PORT}`)
  );
});
