import jwt from "jsonwebtoken";
import { prisma } from "../features/auth/register/controller.js";
export const isUser = async (req, res, next) => {
  const cookie = req.cookies.token;
  const decodedCookie = jwt.decode(cookie);
  if (!decodedCookie.userid) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
      data: [],
      error: [],
    });
  }
  const userId = decodedCookie.userid;
  const userToken = await prisma.token.findFirst({
    where: {
      userId,
    },
  });
  if (cookie == userToken.token) {
    console.log("Valid user");
    next();
  } else {
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
      data: [],
      error: [],
    });
  }
  console.log(JSON.stringify(userToken));
};
