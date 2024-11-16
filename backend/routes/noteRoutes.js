import express from "express";
import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  updateNotePinned,
} from "../controllers/noteController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, createNote);
router.get("/all", verifyToken, getAllNotes);
router.put("/edit/:noteId", verifyToken, updateNote);
router.delete("/delete/:noteId", verifyToken, deleteNote);
router.put("/update-note-pinned/:noteId", verifyToken, updateNotePinned);

export default router;
