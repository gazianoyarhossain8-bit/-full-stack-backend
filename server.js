import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/userRouter.js";
import authRoute from "./routes/authRoute.js";
import protect from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB error:", error);
  }
};

connectDB();

// routes
app.use("/api", protect, userRouter);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

export default app;
