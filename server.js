import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import authRoute from './routes/authRoute.js'
import protect from "./middleware/authMiddleware.js";
import e from "express";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors())


app.use("/api",protect,userRouter)
app.use("/auth", authRoute)


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongodb Atlas connected"))
.catch((err) =>{
  console.log('error',err)
});
export default app;
