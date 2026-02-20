import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRoute.js";
const PORT = process.env.PORT || 5000;  


dotenv.config();

const app = express();
app.use(cors({
  origin: "https://full-stack-frontend-virid.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


                                                        
  


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
app.use("/api", userRouter);
app.use("/auth", authRouter);


app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 