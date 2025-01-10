import { Router } from "express";
import {
  getReviewController,
  getSingleReview,
  reviewController,
} from "./controller.js";

const reviewRouter = Router();
reviewRouter.post("/", reviewController);
reviewRouter.get("/", getReviewController);
reviewRouter.get("/:id", getSingleReview);

export default reviewRouter;
