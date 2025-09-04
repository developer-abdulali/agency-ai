import express from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import protectedRoute from "../middleware/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.get("/token", protectedRoute, getStreamToken);

export default chatRouter;
