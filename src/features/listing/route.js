import { Router } from "express";
import { isUser } from "../../middlewares/isUser.js";
import {
  createListingController,
  getlistingsController,
  getSingleListing,
  getUserListings,
} from "./controller.js";

const listRouter = Router();
listRouter.post("/", isUser, createListingController);
listRouter.get("/", isUser, getlistingsController);
listRouter.get("/:id", isUser, getSingleListing);
listRouter.get("/user/:ownerId", isUser, getUserListings);
export default listRouter;
