import { Router } from "express";
import { isUser } from "../../middlewares/isUser.js";
import {
  createReservationController,
  deleteReservation,
  getAllReservation,
  getSingleReservation,
  getUserReservations,
} from "./controller.js";

const reservationRouter = Router();
reservationRouter.post("/", isUser, createReservationController);
reservationRouter.get("/", isUser, getAllReservation);
reservationRouter.get("/:id", isUser, getSingleReservation);
reservationRouter.delete("/:id", isUser, deleteReservation);
reservationRouter.get(
  "/userReservations/:reserverId",
  isUser,
  getUserReservations
);
export default reservationRouter;
