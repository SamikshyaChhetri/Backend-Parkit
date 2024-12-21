import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
export const prisma = new PrismaClient();
export const registerController = async (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  // const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    },
  });
  return res.send(createUser);
};
