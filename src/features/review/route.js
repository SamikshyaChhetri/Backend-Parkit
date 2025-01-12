import { Router } from "express";
import {
  getReviewController,
  getReviewsOfListing,
  getSingleReview,
  reviewController,
} from "./controller.js";

const reviewRouter = Router();
reviewRouter.post("/", reviewController);
reviewRouter.get("/", getReviewController);
reviewRouter.get("/:id", getSingleReview);
reviewRouter.get("/listing/:listingId", getReviewsOfListing);

export default reviewRouter;
