import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./MongoDB/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import globalErrorHandler from "./utils/errorController.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173', 'https://open-say.vercel.app',];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.set("trust proxy", 1);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

app.use(globalErrorHandler);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server is up on port: 8080"));
  } catch (e) {
    console.log(e);
  }
};

startServer();
