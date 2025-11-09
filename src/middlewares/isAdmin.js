import jwt from "jsonwebtoken";
import { prisma } from "../features/auth/register/controller.js";

export const isAdmin = async (req, res, next) => {
  const cookie = req.cookies.token;
  const decodedCookie = jwt.decode(cookie);
  
  if (!decodedCookie) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
      data: [],
      error: [],
    });
  }
  
  const userId = decodedCookie.userid;
  res.locals.userId = userId;
  
  const userToken = await prisma.token.findFirst({
    where: {
      userId,
    },
  });
  
  if (!userToken || cookie !== userToken.token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
      data: [],
      error: [],
    });
  }
  
  // Check if user is admin
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      type: true,
    },
  });
  
  if (!user || user.type !== "admin") {
    return res.status(403).send({
      success: false,
      message: "Forbidden: Admin access required",
      data: [],
      error: [],
    });
  }
  
  next();
};
