import { prisma } from "../auth/register/controller.js";

export const reviewController = async (req, res) => {
  try {
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
    const reviews = await prisma.review.findMany({
      where: { listingId: req.body.listingId },
    });
    let sum = 0;
    reviews.forEach((i) => {
      sum += i.rating;
    });
    const avg = sum / reviews.length;
    console.log(sum, avg, reviews.length, listingId);
    await prisma.listing.update({
      where: { id: listingId },
      data: { rating: avg },
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

export const getReviewController = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    return res.status(200).send({
      success: true,
      data: reviews,
      message: "Reviews fetched successfully",
      error: [],
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).send({
      success: false,
      data: [],
      message: "Failed to fetch reviews",
      error: [error.message],
    });
  }
};

export const getSingleReview = async (req, res) => {
  try {
    const review = await prisma.review.findFirst({
      where: { id: req.params.id },
    });
    if (!review) {
      return res.status(404).send({
        success: false,
        data: [],
        message: "Review not found",
        error: ["Review not found"],
      });
    }
    return res.status(200).send({
      success: true,
      data: review,
      message: "Review fetched successfully",
      error: [],
    });
  } catch (error) {
    console.error("Error fetching review:", error);
    return res.status(500).send({
      success: false,
      data: [],
      message: "Failed to fetch review",
      error: [error],
    });
  }
};

export const getReviewsOfListing = async (req, res) => {
  const reviewsOfListing = await prisma.review.findMany({
    where: { listingId: req.params.listingId },
    include: { reviewer: true },
  });

  return res.status(200).send({
    success: true,
    data: reviewsOfListing,
    message: "Reviews fetched successfully",
    error: [],
  });
};
