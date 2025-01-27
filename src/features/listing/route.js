import { Router } from "express";
import { isUser } from "../../middlewares/isUser.js";
import {
  createListingController,
  getlistingsController,
  getSingleListing,
  getUserListings,
  updateListingDetails,
} from "./controller.js";

const listRouter = Router();
listRouter.post("/", isUser, createListingController);
listRouter.get("/", isUser, getlistingsController);
listRouter.get("/:id", isUser, getSingleListing);
listRouter.get("/user/:ownerId", isUser, getUserListings);
listRouter.patch("/:id", isUser, updateListingDetails);
export default listRouter;
