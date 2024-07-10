import authRouter from "./auth/index.js";
import startupRouter from "./startup/index.js";
import UserRouter from "./user/index.js";


const allRoutes = [
  authRouter,
  startupRouter,
  UserRouter
];

export default allRoutes;
