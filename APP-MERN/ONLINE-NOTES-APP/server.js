const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;
const NOTES_FILE = "notes.json";

app.use(express.json());
app.use(cors());

// Load notes from JSON file
const loadNotes = () => {
  if (fs.existsSync(NOTES_FILE)) {
    const data = fs.readFileSync(NOTES_FILE);
    return JSON.parse(data);
  }
  return [];
};

// Save notes to JSON file
const saveNotes = (notes) => {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
};

// Get all notes
app.get("/notes", (req, res) => {
  res.json(loadNotes());
});

// Save a new note
app.post("/notes", (req, res) => {
  const notes = loadNotes();
  const newNote = { id: Date.now(), ...req.body };
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

// Update a note
app.put("/notes/:id", (req, res) => {
  let notes = loadNotes();
  notes = notes.map((note) =>
    note.id === parseInt(req.params.id) ? { ...note, ...req.body } : note
  );
  saveNotes(notes);
  res.json({ message: "Note updated" });
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  let notes = loadNotes();
  notes = notes.filter((note) => note.id !== parseInt(req.params.id));
  saveNotes(notes);
  res.json({ message: "Note deleted" });
});

// Clear all notes
app.delete("/notes", (req, res) => {
  saveNotes([]);
  res.json({ message: "All notes cleared" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
