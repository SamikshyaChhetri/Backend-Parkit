import { prisma } from "../auth/register/controller.js";
import { findNearestListing } from "./algorithm.js";
export const GetRecommendationController = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    const allListings = await prisma.listing.findMany();
    const nearestListing = findNearestListing({ lat, lng }, allListings);
    console.log(nearestListing);

    return res.status(200).send({
      status: 200,
      success: true,
      message: "Lising recommendation retrieved",
      data: [nearestListing],
    });
  } catch (error) {
    res.statu(500).send("Internal server error");
  }
};
