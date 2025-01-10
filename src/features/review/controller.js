import { prisma } from "../auth/register/controller.js";

export const reviewController = async (req, res) => {
  try {
    // const { rating, comment } = req.body;
    const rating = req.body.rating;
    const comment = req.body.comment;
    const reviewerId = req.body.reviewerId;
    const listingId = req.body.listingId;

    // Ensure rating and comment are provided
    if (!rating || !comment) {
      return res.status(400).send({
        success: false,
        data: [],
        message: "Rating and comment are required",
        error: ["Missing required fields"],
      });
    }
    // Create the review in the database
    const createReview = await prisma.review.create({
      data: {
        rating,
        comment,
        reviewerId,
        listingId,
      },
    });
    // Respond with success
    return res.status(201).send({
      success: true,
      data: createReview,
      message: "Review added successfully",
      error: [],
    });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).send({
      success: false,
      data: [],
      message: "Failed to add review",
      error: [error.message],
    });
  }
};
