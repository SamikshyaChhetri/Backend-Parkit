import { Router } from "express";
import { settingsController } from "./controller.js";

const settingsRouter = Router();
settingsRouter.patch("/settings/:id", settingsController);
