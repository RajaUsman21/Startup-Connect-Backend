import StartupModel from "../../model/startup/index.js";
import sequelize from "../../db/config.js";
const NearestStartupController = {
    nearestStartup: async (req, res, next) => {
        try {
          const { startupLatitude, startupLongitude } = req.query;
    
          const nearStartups = await StartupModel.findAll({
            order: [
              sequelize.literal(
                `ST_Distance(location, ST_MakePoint(${startupLongitude}, ${startupLatitude}))`
              ),
            ],
            limit: 10,
          });
        //   const profileUrls = [];
        //   for (let i = 0; i < nearStartups.length; i++) {
        //     const fullUrl =
        //       req.protocol +
        //       "://" +
        //       req.get("host") +
        //       "/" +
        //       nearStartups[i].profilePicture.replace(/\\/g, "/");
        //     profileUrls.push(fullUrl);
        //   }
        //   console.log(profileUrls);
    
          res.status(200).json({ nearStartups });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: error.message,
          });
        }
      },
}
export default NearestStartupController