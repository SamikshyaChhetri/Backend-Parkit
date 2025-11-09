import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const userController = async (req, res) => {
  const alluser = await prisma.user.findMany();
  res.send(alluser);
};

export const getCurrentUserController = async (req, res) => {
  try {
    const userId = res.locals.userId; // Set by isUser or isAdmin middleware
    
    if (!userId) {
      return res.status(401).send({
        success: false,
        data: null,
        message: "Unauthorized",
        error: ["User ID not found"],
      });
    }

    const userData = await prisma.user.findFirst({
      where: {
        id: userId,
      },
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
      },
    });

    if (!userData) {
      return res.status(404).send({
        success: false,
        data: null,
        message: "User not found",
        error: ["User not found"],
      });
    }

    return res.status(200).send({
      success: true,
      data: userData,
      message: "Current user retrieved",
      error: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      data: null,
      message: "Internal Server Error",
      error: [error.message],
    });
  }
};

export const singleUserController = async (req, res) => {
  const userData = await prisma.user.findFirst({
    where: {
      id: req.params.id,
    },
  });
  if (!userData) {
    return res.status(404).send({
      success: false,
      data: [],
      message: "User not found",
      error: ["User not found"],
    });
  }
  return res.status(200).send({
    success: true,
    data: userData,
    message: "User retrieved",
    error: [],
  });
};
