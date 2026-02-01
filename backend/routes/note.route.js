import express from "express"
import { createNote, deleteNote, getNotes, updateNote, togglePinNote } from "../controllers/note.controller.js"



const router = express.Router()

router.post("/create-note", createNote)
router.get("/get-notes", getNotes)
router.put("/update-note/:id", updateNote)
router.delete("/delete-note/:id", deleteNote)
router.patch("/pin-note/:id", togglePinNote)

export default router