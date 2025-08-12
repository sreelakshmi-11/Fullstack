import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import clerkWebhooks from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import "module-alias/register.js";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/mongodb.js";

dotenv.config();
const app = express();
await connectDB();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("API working");
});
app.post("/clerk", clerkWebhooks);
app.use("/api/educator", educatorRouter);

app.listen(PORT, () => {
  console.log("server running on Port 8000");
});
