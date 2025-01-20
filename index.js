import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import loginrouter from "./src/features/auth/login/routes.js";
import registerRouter from "./src/features/auth/register/route.js";
import listRouter from "./src/features/listing/route.js";
import reservationRouter from "./src/features/reserve/route.js";
import reviewRouter from "./src/features/review/route.js";
import userRouter from "./src/features/users/route.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use("/auth", registerRouter);
app.use("/users", userRouter);
app.use("/auth", loginrouter);
app.use("/listing", listRouter);
app.use("/review", reviewRouter);
app.use("/reserve", reservationRouter);
app.get("/", (req, res) => {
  res.send("I am alive");
});
app.listen(3333, () => {
  console.log("Server is running at 3333 port");
});
