import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const StartupModel = sequelize.define(
  "Startup",
  {
    startupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    location: { type: DataTypes.GEOGRAPHY("POINT", 4326), allowNull: false },
    website: {
      type: DataTypes.STRING,
    },
    logo:{
      type: DataTypes.STRING
    }

  },
  {
  }
);

export default StartupModel;
