import { Router } from "express";
import { loginController } from "./controller.js";

const loginrouter = Router();
loginrouter.post("/login", loginController);
export default loginrouter;
