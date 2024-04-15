import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("Pong");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS! 404 page not found");
});

app.use(errorMiddleware);

export default app;