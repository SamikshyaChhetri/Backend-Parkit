import cors from "cors";
import express from "express";
import registerRouter from "./src/features/auth/register/route.js";
import userRouter from "./src/features/users/route.js";
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/auth", registerRouter);
app.use("/users", userRouter);

app.listen(3333, () => {
  console.log("Server is running at 3333 port");
});
