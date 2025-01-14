import { Router } from "express";
import { createReservationController } from "./controller.js";

const reservationRouter = Router();
reservationRouter.post("/", createReservationController);
export default reservationRouter;
