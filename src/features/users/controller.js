import { Prisma } from "@prisma/client";
const prisma = new Prisma();
export const userController = async (req, res) => {
  const alluser = await prisma.user.findMany();
  res.send(alluser);
};
export const singleUserController = async (req, res) => {
  const userData = await prisma.user.findFirst({
    where: {
      id: req.params.id,
    },
  });
  if (!userData) {
    return res.send("No user found");
  }

  return res.send(userData);
};
