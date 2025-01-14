import { Router } from "express";
import {
  createReservationController,
  getAllReservation,
  getSingleReservation,
} from "./controller.js";

const reservationRouter = Router();
reservationRouter.post("/", createReservationController);
reservationRouter.get("/", getAllReservation);
reservationRouter.get("/:id", getSingleReservation);
export default reservationRouter;
