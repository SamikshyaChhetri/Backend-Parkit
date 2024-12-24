import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  if (comparePassword) {
    const token = jwt.sign(
      {
        userid: findUser.id,
      },
      "www"
    );
    console.log(token);
    return res.send({
      success: true,
      data: {
        token,
        user: findUser,
      },
      message: "User logged in successfully",
      error: [],
    });
  } else {
    return res.status(401).send({
      success: false,
      data: [],
      message: "Invalid password",
      error: [],
    });
  }
};
