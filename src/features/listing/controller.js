import { prisma } from "../auth/register/controller.js";

export const listController = async (req, res) => {
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

  return res.send({
    success: true,
    data: createList,
    message: "list added successfully",
    error: [],
  });
};

export const getlistController = async (req, res) => {
  const all_list = await prisma.listing.findMany();
  res.send(all_list);
};

export const getSingleList = async (req, res) => {
  const listdata = await prisma.listing.findFirst({
    where: { id: req.params.id },
  });
  return res.send(getSingleList);
};
