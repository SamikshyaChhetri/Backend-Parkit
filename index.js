import express from "express";
import registerRouter from "./src/features/auth/register/route.js";
import userRouter from "./src/features/users/route.js";
const app = express();
app.use(express.json());
app.use("/auth", registerRouter);
app.use("/users", userRouter);

// const prisma = new PrismaClient();
// app.post("/adduser", async (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const id = Date.now().toString();
//   const age = req.body.age;
//   const gender = req.body.gender;
//   const createUser = await prisma.user.create({
//     data: {
//       name,
//       email,
//       id,
//       age,
//       gender,
//     },
//   });
//   return res.send(createUser);
// });
// app.get("/getuser", async (req, res) => {
//   const alluser = await prisma.user.findMany();
//   res.send(alluser);
// });
// app.get("/getsingleuser/:email", async (req, res) => {
//   console.log(req.params);
//   const user = await prisma.user.findFirst({
//     where: {
//       email: req.params.email,
//     },
//   });
//   if (!user) {
//     return res.send("No user found");
//   }

//   return res.send(user);
// });

// app.delete("/deleteuser/:id", async (req, res) => {
//   const user = await prisma.user.findFirst({
//     where: {
//       id: req.params.id,
//     },
//   });
//   if (user) {
//     const deletedUser = await prisma.user.delete({
//       where: {
//         id: req.params.id,
//       },
//     });
//     return res.send(deletedUser);
//   }
//   return res.send("User not found");
// });
// app.patch("/updateUser/:id", async (req, res) => {
//   const user = await prisma.user.findFirst({
//     where: {
//       id: req.params.id,
//     },
//   });
//   if (user) {
//     const { name, email, age, gender } = req.body;
//     const updateuserData = await prisma.user.update({
//       where: {
//         id: req.params.id,
//       },
//       // data: {
//       //   name: req.body.name,
//       //   email: req.body.name,
//       //   age: req.body.age,
//       //   gender:req.body.gender,
//       // },
//       data: {
//         name,
//         email,
//         age,
//         gender,
//       },
//     });
//     return res.send(updateuserData);
//   }
//   return res.send("No data available");
// });

app.listen(3333, () => {
  console.log("Server is running at 3333 port");
});
