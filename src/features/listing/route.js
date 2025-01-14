import { Router } from "express";
import {
  createListingController,
  getlistingsController,
  getSingleListing,
  getUserListings,
} from "./controller.js";

const listRouter = Router();
listRouter.post("/", createListingController);
listRouter.get("/", getlistingsController);
listRouter.get("/:id", getSingleListing);
listRouter.get("/user/:ownerId", getUserListings);
export default listRouter;
