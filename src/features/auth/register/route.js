import { Router } from "express";
import { getcontroller } from "./controller.js";

const registerRouter = Router();
registerRouter.get("/getroute", getcontroller);
export default registerRouter;
