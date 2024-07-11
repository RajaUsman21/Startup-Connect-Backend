import { Router } from "express";
import NearestStartupController from "../../controller/nearestStartup/index.js";
const NearestStartupRouter = Router();
NearestStartupRouter.get("/nearest-startup",NearestStartupController.nearestStartup);
export default NearestStartupRouter