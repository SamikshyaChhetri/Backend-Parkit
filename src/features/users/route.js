import { Router } from "express";
const userRouter = Router();
userRouter.get("/getUser", userController);
userRouter.get("/getSingleuser/:id", singleUserController);
export default userRouter;
