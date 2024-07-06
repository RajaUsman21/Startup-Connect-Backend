import StartupModel from '../../model/startup/index.js'; // Adjusted import path

const StartupController = {
  registerStartup: async (req, res) => {
    const payload = req.body;
    try {
      if (!payload.name || !payload.description || !payload.location) {
        return res
          .status(400)
          .json({ message: "Name, description, and location are required" });
      }

      const startup = await StartupModel.create(payload);

      return res.status(201).json({ message: "Startup registered", data: startup });
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

      return res.status(200).json({ message: "Startup updated", data: startup });
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

  // searchStartups: async (req, res) => {
  //   const { query } = req.query;
  //   try {
  //     const startups = await StartupModel.findAll({
  //       where: sequelize.literal(`MATCH (name, description, location) AGAINST ('${query}' IN NATURAL LANGUAGE MODE)`)
  //     });
  //     res.status(200).json({ data: startups });
  //   } catch (error) {
  //     console.error("Search startups error: ", error);
  //     res.status(500).json({ message: "Internal server error", error });
  //   }
  // },
};

export default StartupController;
