import StartupModel from "../../model/startup/index.js";
import sequelize from "../../db/config.js";
import { Op } from "sequelize";
import getCoordsForAddress from "../../utils/location.js";
import axios from "axios";

const StartupController = {
  registerStartup: async (req, res) => {
    // res.status(201).json({ message: "Request Recieved" });
    const { startupName, description, address, logo, website } = req.body;
    console.log("====================================");
    console.log("Received data:", req.body);
    console.log("====================================");

    try {
      if (!startupName || !description || !address || !logo || !website) {
        return res
          .status(400)
          .json({
            message:
              "Name, description, address, logo, and website are required",
          });
      }

      let locationCoordinates;
      if (address) {
        try {
          locationCoordinates = await getCoordsForAddress(address);
          if (!locationCoordinates) {
            throw new Error("Invalid address");
          }
        } catch (err) {
          console.error("Error fetching coordinates:", err);
          return res.status(400).json({ message: "Invalid address" });
        }
      }

      const geoJSON = {
        type: "Point",
        coordinates: [locationCoordinates.lng, locationCoordinates.lat],
      };

      const startup = await StartupModel.create({
        startupName,
        description,
        address,
        logo: logo.buffer,
        website,
        location: geoJSON,
      });

      res.status(201).json({ message: "Startup registered", data: startup });
    } catch (error) {
      console.error("Register startup error: ", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  updateStartup: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      const startup = await StartupModel.findByPk(id);
      if (!startup) {
        return res.status(404).json({ message: "Startup not found" });
      }

      Object.assign(startup, updates);
      await startup.save();

      return res
        .status(200)
        .json({ message: "Startup updated", data: startup });
    } catch (error) {
      console.error("Update startup error: ", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  viewStartup: async (req, res) => {
    const { id } = req.params;
    try {
      const startup = await StartupModel.findByPk(id);
      if (!startup) {
        return res.status(404).json({ message: "Startup not found" });
      }
      res.status(200).json({ data: startup });
    } catch (error) {
      console.error("View startup error: ", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  deleteStartup: async (req, res) => {
    const { id } = req.params;
    try {
      const startup = await StartupModel.findByPk(id);
      if (!startup) {
        return res.status(404).json({ message: "Startup not found" });
      }
      await startup.destroy();
      res.status(200).json({ message: "Startup deleted", data: startup });
    } catch (error) {
      console.error("Delete startup error: ", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  listStartups: async (req, res) => {
    try {
      const startups = await StartupModel.findAll();
      res.status(200).json({ data: startups });
    } catch (error) {
      console.error("List startups error: ", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  searchStartups: async (req, res) => {
    const { query } = req.query;
    try {
      const startups = await StartupModel.findAll({
        where: {
          [Op.or]: [
            { name: query },
            { description: query },
            { location: query },
          ],
        },
      });
      res.status(200).json({ data: startups });
    } catch (error) {
      console.error("Search startups error: ", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};

export default StartupController;
