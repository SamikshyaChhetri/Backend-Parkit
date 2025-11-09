import moment from "moment";
import { prisma } from "../auth/register/controller.js";

export const getAdminStats = async (req, res) => {
  try {
    // basic counts
    const usersCount = await prisma.user.count();
    const listingsCount = await prisma.listing.count();
    const reservationsCount = await prisma.reservation.count();
    const reviewsCount = await prisma.review.count();

    // latest listings and recent users (best-effort - schema doesn't include createdAt)
    const latestListings = await prisma.listing.findMany({ 
      take: 5,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });
    
    // get recent users with their listing and reservation counts
    const recentUsers = await prisma.user.findMany({ 
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        country: true,
        avatar: true,
        type: true,
        _count: {
          select: {
            listing: true,
            reservation: true,
            review: true,
          }
        }
      }
    });

    // reservations per day for last 7 days (use reservation.date field)
    const now = new Date();
    const fromDate = new Date();
    fromDate.setHours(0, 0, 0, 0);
    fromDate.setDate(now.getDate() - 6); // last 7 days including today

    const reservations7 = await prisma.reservation.findMany({
      where: {
        date: {
          gte: fromDate,
        },
      },
    });

    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      days.push(moment(d).format("YYYY-MM-DD"));
    }

    const countsByDay = days.map((day) => {
      const count = reservations7.filter((r) => moment(r.date).format("YYYY-MM-DD") === day).length;
      return { day, count };
    });

    return res.status(200).send({
      success: true,
      data: {
        counts: {
          users: usersCount,
          listings: listingsCount,
          reservations: reservationsCount,
          reviews: reviewsCount,
        },
        reservationsPerDay: countsByDay,
        latestListings,
        recentUsers,
      },
      message: "Admin stats retrieved",
      error: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(200).send({ success: false, data: [], message: "Internal Server Error", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        country: true,
        zipcode: true,
        gender: true,
        avatar: true,
        type: true,
        _count: {
          select: {
            listing: true,
            reservation: true,
            review: true,
          }
        }
      }
    });

    return res.status(200).send({
      success: true,
      data: users,
      message: "All users retrieved",
      error: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      data: [],
      message: "Internal Server Error",
      error: [],
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        data: [],
        message: "User not found",
        error: [],
      });
    }

    // Prevent deleting admin users
    if (user.type === "admin") {
      return res.status(403).send({
        success: false,
        data: [],
        message: "Cannot delete admin users",
        error: [],
      });
    }

    // Delete user (cascade will handle related data)
    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).send({
      success: true,
      data: [],
      message: "User deleted successfully",
      error: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      data: [],
      message: "Internal Server Error",
      error: [],
    });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          }
        },
        _count: {
          select: {
            reservation: true,
            review: true,
          }
        }
      }
    });

    return res.status(200).send({
      success: true,
      data: listings,
      message: "All listings retrieved",
      error: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      data: [],
      message: "Internal Server Error",
      error: [],
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;

    // Check if listing exists
    const listing = await prisma.listing.findFirst({
      where: { id: listingId },
    });

    if (!listing) {
      return res.status(404).send({
        success: false,
        data: [],
        message: "Listing not found",
        error: [],
      });
    }

    // Delete listing (cascade will handle related data like reservations and reviews)
    await prisma.listing.delete({
      where: { id: listingId },
    });

    return res.status(200).send({
      success: true,
      data: [],
      message: "Listing deleted successfully",
      error: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      data: [],
      message: "Internal Server Error",
      error: [],
    });
  }
};
