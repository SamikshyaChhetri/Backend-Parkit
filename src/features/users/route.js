import { Router } from "express";
import { singleUserController, userController } from "./controller.js";
const userRouter = Router();
userRouter.get("/getUser", userController);
userRouter.get("/getSingleuser/:id", singleUserController);
export default userRouter;
