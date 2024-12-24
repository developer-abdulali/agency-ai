import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessages } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", isLoggedIn, getAllUsers);
router.get("/messages/:userId", isLoggedIn, getMessages);

export default router;
