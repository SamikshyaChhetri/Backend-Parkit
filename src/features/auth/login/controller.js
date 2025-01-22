import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../register/controller.js";
export const loginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const findUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!findUser) {
    return res.status(404).send({
      success: false,
      data: [],
      message: "User not found",
      error: [],
    });
  }
  const comparePassword = await bcrypt.compare(password, findUser.password);
  if (!comparePassword) {
    return res.status(401).send({
      success: false,
      data: [],
      message: "Invalid password",
      error: [],
    });
  }
  if (comparePassword) {
    const token = jwt.sign(
      {
        userid: findUser.id,
      },
      "www"
    );
    res.cookie("token", token, {
      httpOnly: true,
    });
    const findToken = await prisma.token.findFirst({
      where: {
        userId: findUser.id,
      },
    });

    if (!findToken) {
      await prisma.token.create({
        data: {
          token,
          userId: findUser.id,
        },
      });
    } else {
      await prisma.token.update({
        where: { userId: findUser.id },
        data: {
          token,
        },
      });
    }
    return res.send({
      success: true,
      data: {
        token,
        user: findUser,
      },
      message: "User logged in successfully",
      error: [],
    });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token");
  return res.send({
    success: true,
    data: [],
    message: "User logged out successfully",
    error: [],
  });
};
