import { Router } from "express";
import {
  createListingController,
  getlistingsController,
  getSingleListing,
} from "./controller.js";

const listRouter = Router();
listRouter.post("/", createListingController);
listRouter.get("/", getlistingsController);
listRouter.get("/:id", getSingleListing);
export default listRouter;
