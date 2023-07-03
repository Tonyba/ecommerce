import sequelize from "./src/database/db.js";
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();
async function start() {
  try {
    await sequelize.sync({ force: false });
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
