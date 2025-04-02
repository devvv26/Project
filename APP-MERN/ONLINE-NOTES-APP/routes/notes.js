const express = require("express");
const Note = require("../models/Note"); // Import Note model
const router = express.Router();

// ✅ CREATE a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Error creating note" });
  }
});

// ✅ READ all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// ✅ UPDATE a note
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Error updating note" });
  }
});

// ✅ DELETE a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting note" });
  }
});

module.exports = router;
