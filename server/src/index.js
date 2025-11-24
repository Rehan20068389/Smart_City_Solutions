require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");


const PORT = process.env.PORT || 4000;

  app.listen(PORT,async () => {
    console.log(`Server running on ${PORT}`);
  

  try {
    await sequelize.authenticate();
    console.log("DB Connection Is OK !!");
  } catch (error) {
    console.log("DB Connection Failed",err);
  }

});
