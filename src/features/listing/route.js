import { Router } from "express";
import {
  getlistController,
  getSingleList,
  listController,
} from "./controller.js";

const listRouter = Router();
listRouter.post("/", listController);
listRouter.get("/", getlistController);
listRouter.get("/:id", getSingleList);
export default listRouter;
