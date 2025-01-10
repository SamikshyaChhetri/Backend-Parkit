import { Router } from "express";
import { reviewController } from "./controller.js";

const reviewRouter = Router();
reviewRouter.post("/", reviewController);

export default reviewRouter;
