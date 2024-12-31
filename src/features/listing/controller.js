import { prisma } from "../auth/register/controller.js";

export const createListingController = async (req, res) => {
  try {
    const {
      city,
      street,
      country,
      zipcode,
      type,
      description,
      rating,
      price,
      no_of_vehicle,
      ownerId,
    } = req.body;

    const createList = await prisma.listing.create({
      data: {
        city,
        street,
        country,
        zipcode,
        type,
        description,
        rating,
        price,
        no_of_vehicle,
        ownerId,
      },
    });

    return res.status(201).send({
      success: true,
      data: createList,
      message: "List added successfully",
      error: [],
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
export const getlistingsController = async (req, res) => {
  const all_list = await prisma.listing.findMany();
  return res.status(200).send({
    success: true,
    data: all_list,
    message: "All Listing retrived",
    error: [],
  });
};

export const getSingleListing = async (req, res) => {
  const listdata = await prisma.listing.findFirst({
    where: { id: req.params.id },
  });
  if (listdata) {
    return res.status(200).send({
      success: true,
      data: listdata,
      message: "Single listing retrieved",
      error: [],
    });
  }
  return res.status(404).send({
    success: false,
    data: [],
    message: "Listing not found",
    error: ["Listing not found"],
  });
};
