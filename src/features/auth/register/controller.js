import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const registerController = async (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
      address,
      phone,
    },
  });
  return res.send(createUser);
};
