import express from "express";
import {
  signupUser,
  signinUser,
  signoutUser,
} from "../controllers/authController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/signout", verifyToken, signoutUser);

export default router;
