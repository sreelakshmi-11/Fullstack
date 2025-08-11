import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import clerkWebhooks from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import "module-alias/register.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const MONGO = process.env.MONGO_URI;
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("API working");
});
app.post("/clerk", express.json(), clerkWebhooks);

app.use("/api/educator", express.json(), educatorRouter);
mongoose
  .connect(MONGO)
  .then(() => {
    console.log("MONGO DB conected");
  })
  .catch((err) => {
    console.log("Error connecting to MONGO DB:", err.message);
  });
app.listen(PORT, () => {
  console.log("server running on Port 8000");
});
