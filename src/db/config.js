import { Sequelize } from "sequelize";


const sequelize = new Sequelize("Startup-Connect", "postgres", "raja1234", {
  host: "localhost",
  dialect: "postgres",
});

export const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
