import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
app.use(express.json());
const prisma = new PrismaClient();
// app.get("/path1", (req, res) => {
//   console.log(req);
//   res.status(400).send("This is response from get request");
//   return;
// });
// app.post("/path2", (req, res) => {
//   console.log(req.body);
//   res.send(`Your name is ${req.body.name}`);
//   if (!req.body.num1) {
//     return res.status(400).send("Num1 is required");
//   }
//   if (!req.body.num2) {
//     return res.status(400).send("Num2 is required");
//   }
//   const sum = req.body.num1 + req.body.num2;
//   return res.send({
//     sum,
//   });
// });
app.post("/adduser", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const id = Date.now().toString();
  const age = req.body.age;
  await prisma.user.create({
    data: {
      name,
      email,
      id,
      age,
    },
  });
});
app.get("/getuser", (req, res) => {
  console.log(res.body.name);
});
app.listen(3333, () => {
  console.log("Server is running at 3333 port");
});
