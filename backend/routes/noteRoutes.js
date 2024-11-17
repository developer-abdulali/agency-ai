import express from "express";
import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  updateNotePinned,
  searchNote,
} from "../controllers/noteController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, createNote);
router.get("/all", verifyToken, getAllNotes);
router.put("/edit/:noteId", verifyToken, updateNote);
router.delete("/delete/:noteId", verifyToken, deleteNote);
router.put("/update-note-pinned/:noteId", verifyToken, updateNotePinned);
router.get("/search", verifyToken, searchNote);

export default router;
