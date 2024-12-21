import bcrypt from "bcrypt";
import { prisma } from "../register/controller.js";
export const loginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  const findUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!findUser) {
    return res.send("User not found");
  }
  const comparePassword = await bcrypt.compare(password, findUser.password);
  console.log(comparePassword);
  comparePassword
    ? res.status(200).send("User logged in")
    : res.status(401).send("Incorrect password");
};
