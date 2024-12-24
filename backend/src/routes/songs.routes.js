import express from "express";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getSongById,
  getTrendingSongs,
} from "../controllers/song.controller.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);
router.get("/:songId", getSongById);
router.get("/", isLoggedIn, isAdmin, getAllSongs);

export default router;
