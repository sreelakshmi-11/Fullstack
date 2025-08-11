import express, { Router } from "express";
import { updateRoleToEducator } from "../controllers/educatorController.js";

let educatorRouter = express.Router();

educatorRouter.get("/update-role", updateRoleToEducator);

export default educatorRouter;
