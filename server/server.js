import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import clerkWebhooks from "./controllers/webhooks.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const MONGO = process.env.MONGO_URI;
app.use(cors());

app.get("/", (req, res) => {
  res.send("API working");
});
app.post("/clerk", express.json(), clerkWebhooks);
mongoose
  .connect(MONGO)
  .then(() => {
    console.log("MONGO DB conected");
    app.listen(PORT, () => {
      console.log("server running on Port 8000");
    });
  })
  .catch(() => {
    console.log("Error connecting to MONGO DB");
  });
