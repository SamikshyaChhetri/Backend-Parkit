import { Router } from "express";
import { removeOldReservations } from "./controller.js";

export const cronsRouter = Router();
cronsRouter.post("/remove-old-reservations", removeOldReservations);
