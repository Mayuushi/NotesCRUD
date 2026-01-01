import express from "express";
import {
    getAllNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote} from "../controller/notesController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/notes", authenticateToken, getAllNotes);
router.get("/notes/:id", authenticateToken, getNoteById);
router.post("/notes", authenticateToken, createNote);
router.put("/notes/:id", authenticateToken, updateNote);
router.delete("/notes/:id", authenticateToken, deleteNote);

export default router;