import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.post("/adduser", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const id = Date.now().toString();
  const age = req.body.age;
  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      id,
      age,
    },
  });
  res.send(createUser);
});
app.get("/getuser", async (req, res) => {
  const alluser = await prisma.user.findMany();
  res.send(alluser);
});
app.listen(3333, () => {
  console.log("Server is running at 3333 port");
});
