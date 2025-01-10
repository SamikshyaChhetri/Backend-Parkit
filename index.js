import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import loginrouter from "./src/features/auth/login/routes.js";
import registerRouter from "./src/features/auth/register/route.js";
import listRouter from "./src/features/listing/route.js";
import reviewRouter from "./src/features/review/route.js";
import userRouter from "./src/features/users/route.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/auth", registerRouter);
app.use("/users", userRouter);
app.use("/auth", loginrouter);
app.use("/listing", listRouter);
app.use("/review", reviewRouter);
app.listen(3333, () => {
  console.log("Server is running at 3333 port");
});
