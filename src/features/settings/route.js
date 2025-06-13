import { Router } from "express";
import { isUser } from "../../middlewares/isUser.js";
import {
  updateImageController,
  updateProfileController,
} from "./controller.js";

const settingsRouter = Router();
settingsRouter.patch("/update", isUser, updateProfileController);
settingsRouter.patch("/updateImage", isUser, updateImageController);
export default settingsRouter;
