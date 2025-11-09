import { Router } from "express";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isUser } from "../../middlewares/isUser.js";
import { getCurrentUserController, singleUserController, userController } from "./controller.js";
const userRouter = Router();
userRouter.get("/getUser", isUser, userController);
userRouter.get("/me", isUser, getCurrentUserController); // Get current logged-in user
userRouter.get("/admin/me", isAdmin, getCurrentUserController); // Get current admin user
userRouter.get("/getSingleuser/:id", isUser, singleUserController);
export default userRouter;
