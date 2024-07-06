import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const StartupModel = sequelize.define(
  "Startup",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
    },
  },
  {
  }
);

export default StartupModel;
