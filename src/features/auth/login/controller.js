import bcrypt from "bcrypt";
import { prisma } from "../register/controller.js";
export const loginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email, password);
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
  console.log(comparePassword);
  comparePassword
    ? res.status(200).send({
        success: true,
        data: [],
        message: "User logged in successfully",
        error: [],
      })
    : res.status(401).send({
        success: false,
        data: [],
        message: "Invalid password",
        error: [],
      });
};
