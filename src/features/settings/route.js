import { Router } from "express";
import { updateProfileController } from "./controller.js";

const settingsRouter = Router();
settingsRouter.patch("/update/:id", updateProfileController);
