import moment from "moment";
import { prisma } from "../auth/register/controller.js";

const removeOldReservations = async (req, res) => {
  try {
    await prisma.reservation.deleteMany({
      where: {
        date: {
          lt: moment().startOf("day"),
        },
      },
    });
    // Logic to remove old reservations
    res.status(200).send("Old reservations removed");
  } catch (error) {
    res.status(500).send("Error removing old reservations");
  }
};

export { removeOldReservations };
