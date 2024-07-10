import { Router } from "express";
import UserController from "../../controller/user/index.js";
import uploadMiddleware from "../../middleware/multer.js";
import AuthenticateMiddleware from "../../middleware/auth.js";
const UserRouter = Router();
UserRouter.get('/get-user',AuthenticateMiddleware,UserController.getUser);
UserRouter.patch('/update-profile',AuthenticateMiddleware,uploadMiddleware,UserController.updateUser)
UserRouter.get("/uploads/:filename",UserController.getProfilePicture)
export default UserRouter