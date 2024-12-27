import express from "express";
import {
  addSong,
  getAllSongs,
  removeSong,
} from "../controllers/songController.js";
import upload from "../middlewares/multer.js";

const songRouter = express.Router();

songRouter.post(
  "/add",
  upload.fields([{ name: "audio" }, { name: "image" }]),
  addSong
);
songRouter.get("/list", getAllSongs);
songRouter.post("/remove", removeSong);

export default songRouter;
