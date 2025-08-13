import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import clerkWebhooks from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import "module-alias/register.js";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";

dotenv.config();
const app = express();
await connectDB();
await connectCloudinary();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.post("/clerk", express.json(), clerkWebhooks);
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api/educator", express.json(), educatorRouter);

app.listen(PORT, () => {
  console.log("server running on Port 8000");
});
