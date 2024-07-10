import StartupModel from "../model/startup/index.js";
import UserModel from "../model/user/index.js";

import sequelize from "./config.js";

const syncDB = async () => {
  await sequelize.sync({ alter: true, force: false });
  await UserModel.sync({ alter: true, force: false });
  await StartupModel.sync({ alter: true, force: false});
};

export default syncDB;
