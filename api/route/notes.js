import express from "express";
import {
  getNotes,
  deleteNote,
  getNote,
  addNote,
  updateNote,
} from "../controllers/note.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", addNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

export default router;