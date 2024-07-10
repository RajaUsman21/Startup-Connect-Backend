
import { Router } from "express";
import StartupValidator from '../../validator/startup/index.js';
import startupController from '../../controller/startup/index.js'; 
import AuthenticateMiddleware from "../../middleware/auth.js";
const startupRouter = Router();

startupRouter.post("/startup/register",AuthenticateMiddleware, startupController.registerStartup);
startupRouter.put("/startup/:id", startupController.updateStartup);
startupRouter.get("/startup/:id", startupController.viewStartup);
startupRouter.delete("/startup/:id", startupController.deleteStartup);
startupRouter.get("/startups", startupController.listStartups);
startupRouter.get("/startups/search", startupController.searchStartups);

export default startupRouter;
