import express from "express";
import { authCallback } from "../controllers/auth.controller.js";

const router = express.Router();

// GET /api/users
router.post("/callback", authCallback);

export default router;
