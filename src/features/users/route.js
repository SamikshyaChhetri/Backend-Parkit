import { Router } from "express";
const getUserData = Router();
getUserData.get("/getUser", userController);
export default getUserData;
