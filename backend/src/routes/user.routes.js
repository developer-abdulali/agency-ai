import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getAllUsers);

export default router;
