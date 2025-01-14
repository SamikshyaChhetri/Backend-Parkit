import { prisma } from "../auth/register/controller.js";
import { schema } from "./validator.js";

export const createReservationController = async (req, res) => {
  try {
    const { date, listingId, reserverId } = schema.parse(req.body);
    console.log(data);
    const createdReservation = await prisma.reservation.create({
      data: {
        date,
        listingId,
        reserverId,
      },
    });
    return res.status(400).send({
      success: true,
      data: createdReservation,
      message: "Reservation created",
      error: [],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      data: [],
      message: "Internal server error",
      error: error,
    });
  }
};
