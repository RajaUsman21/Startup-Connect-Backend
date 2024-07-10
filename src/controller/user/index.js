import UserModel from "../../model/user/index.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const UserController = {
  getUser: async (req, res) => {
    try {
      let profilePicture = null;
      let fullUrl = null;
      const user = await UserModel.findOne({ where: { id: req.user.id } });
      if (!user) {
        res.json({ status: 0, message: "User not Found" });
      }
      if (user.profilePicture !== null) {
        profilePicture = user.profilePicture;
        fullUrl =
          req.protocol +
          "://" +
          req.get("host") +
          "/" +
          profilePicture.replace(/\\/g, "/");
      }
      res.json({ status: 1, message: "Got user data", user, fullUrl });
    } catch (error) {
      console.log("====================================");
      console.log({ error });
      console.log("====================================");
    }
  },
  updateUser: async (req, res) => {
    try {
      console.log("====================================");
      console.log("oooooooooooooooooooooooooooooooo");
      console.log("====================================");
      let profilePicture = null;
      // const{name,phone,}
      const user = await UserModel.findOne({ where: { id: req.user.id } });
      console.log("====================================");
      console.log("USEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", user);
      console.log("====================================");
      if (!user) {
        res.json({ status: 0, message: "User not Found" });
      }
      if (req.file) {
        console.log("====================================");
        console.log("CHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL");
        console.log("====================================");
        profilePicture = req.file.path;
        console.log("PROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", profilePicture);
      }
      user.profilePicture = profilePicture;
      await user.save();
      res.json({ status: 1, message: "Profile added", user });
    } catch (error) {
      console.log({ error });
    }
  },
  getProfilePicture: (req, res) => {
    try {
        console.log('====================================');
        console.log("RUl gye oyee");
        console.log('====================================');
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const fileName = req.params.filename;
      const filePath = path.join(__dirname, "../../../uploads", fileName);
      res.sendFile(filePath);
    } catch (error) {
      console.log("====================================");
      console.log("error", error);
      console.log("====================================");
    }
  },
};
export default UserController;
