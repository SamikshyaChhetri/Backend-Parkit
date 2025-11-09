import moment from "moment";
import { prisma } from "../auth/register/controller.js";
import { schema } from "./validator.js";

export const createReservationController = async (req, res) => {
  try {
    const { date, listingId, reserverId, endDate, slots } = schema.parse(req.body);
    // validate date range
    const start = moment(date);
    const end = moment(endDate);
    if (!start.isValid() || !end.isValid()) {
      return res.status(400).send({
        success: false,
        data: [],
        message: "Invalid date or endDate",
        error: [],
      });
    }

    if (end.isBefore(start) || end.isSame(start)) {
      return res.status(400).send({
        success: false,
        data: [],
        message: "endDate must be after start date",
        error: [],
      });
    }

    // Overlap check: two ranges [A,B] and [C,D] overlap if A <= D && B >= C
    // Fetch listing to read capacity
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing) {
      return res.status(404).send({
        success: false,
        data: [],
        message: "Listing not found",
        error: [],
      });
    }

    // listing.noOfVehicle is stored as a string in the schema; coerce to integer
    const capacity = Number(String(listing.noOfVehicle).trim()) || 0;
    const requestedSlots = Number(slots) || 1;

    // Sum existing reserved slots that overlap the requested date/time range
    const overlapWhere = {
      listingId,
      AND: [
        { date: { lte: end.toDate() } },
        { endDate: { gte: start.toDate() } },
      ],
    };

    const aggregate = await prisma.reservation.aggregate({
      where: overlapWhere,
      _sum: { slots: true },
    });

    const existingSlots = (aggregate._sum && aggregate._sum.slots) ? aggregate._sum.slots : 0;

    if (existingSlots + requestedSlots > capacity) {
      return res.status(400).send({
        success: false,
        data: [],
        message: `Not enough available slots for the requested time. Requested ${requestedSlots}, available ${Math.max(0, capacity - existingSlots)}.`,
        error: [],
      });
    }

    const createdReservation = await prisma.reservation.create({
      data: {
        date: moment(date).toDate(),
        endDate: moment(endDate).toDate(),
        listingId,
        reserverId,
        slots: requestedSlots,
      },
    });
    return res.status(201).send({
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

// Fetch all the reservation
export const getAllReservation = async (req, res) => {
  try {
    const allReservations = await prisma.reservation.findMany();

    return res.status(200).send({
      success: true,
      data: allReservations,
      message: "Reservations fetched successfully",
      error: [],
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      data: [],
      message: "Internal server error",
      error: error,
    });
  }
};

//Get a single reservation
export const getSingleReservation = async (req, res) => {
  try {
    const singleReservation = await prisma.reservation.findFirst({
      where: { id: req.params.id },
      include: {
        listing: { include: { owner: true } },
      },
    });
    return res.status(200).send({
      success: true,
      data: singleReservation,
      message: "Reservation fetched successfully",
      error: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      data: [],
      message: "Internal server error",
      error: error,
    });
  }
};

//Get Reservation of User
export const getUserReservations = async (req, res) => {
  try {
    const userReservations = await prisma.reservation.findMany({
      where: {
        reserverId: req.params.reserverId,
      },
      include: { listing: true },
    });
    return res.status(200).send({
      success: true,
      data: userReservations,
      message: "User's Reservations fetched successfully",
      error: [],
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: [],
      message: "Internal server error",
      error: error,
    });
  }
};

//Delete Reservation
export const deleteReservation = async (req, res) => {
  try {
    const deleteReservation = await prisma.reservation.findFirst({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteReservation) {
      return res.status(404).send({
        success: false,
        data: [],
        message: "Reservation not found",
      });
    }
    await prisma.reservation.delete({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({
      success: true,
      data: null,
      message: "Reservation deleted successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      data: [],
      message: "Internal server error",
      error: err,
    });
  }
};
