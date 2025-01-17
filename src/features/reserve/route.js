import { Router } from "express";
import {
  createReservationController,
  getAllReservation,
  getSingleReservation,
  getUserReservations,
} from "./controller.js";

const reservationRouter = Router();
reservationRouter.post("/", createReservationController);
reservationRouter.get("/", getAllReservation);
reservationRouter.get("/:id", getSingleReservation);
reservationRouter.get("/userReservations/:reserverId", getUserReservations);
export default reservationRouter;
