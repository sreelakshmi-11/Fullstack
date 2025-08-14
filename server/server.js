import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clerkWebhooks from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import "module-alias/register.js";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
await connectDB();
await connectCloudinary();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("API working");
});
app.post("/clerk", bodyParser.raw({ type: "application/json" }), clerkWebhooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);

app.listen(PORT, () => {
  console.log("server running on Port 8000");
});
