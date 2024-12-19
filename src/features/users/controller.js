import { Prisma } from "@prisma/client";
const prisma = new Prisma();
export const userController = async (req, res) => {
  const alluser = await prisma.user.findMany();
  res.send(alluser);
};
