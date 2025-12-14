require("dotenv").config();
const app = require("./app");
const sequelize = require("./src/config/database");

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log("DB Connection Is OK !!");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
  }
});
