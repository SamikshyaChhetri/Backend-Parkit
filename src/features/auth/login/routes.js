import { Router } from "express";
import { loginController, logoutController } from "./controller.js";

const loginrouter = Router();
loginrouter.post("/login", loginController);
loginrouter.post("/logout", logoutController);
export default loginrouter;
