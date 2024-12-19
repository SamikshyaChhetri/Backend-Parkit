import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const registerController = async (req, res) => {
  const name = req.body.name;
  const email = req.body.name;
  const password = req.body.name;
  const phone = req.body.name;
  const id = Date.now().toString();
  const address = req.body.address;
  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
      id,
      address,
      phone,
    },
  });
  return res.send(createUser);
};
