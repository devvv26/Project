const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const NOTES_FILE = path.join(__dirname, 'notes.json');

// Load notes from file
const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync(NOTES_FILE));
    } catch (error) {
        return [];
    }
};

// Save notes to file
const saveNotes = (notes) => fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));

// API Routes
app.get('/notes', (req, res) => res.json(loadNotes()));

app.post('/notes', (req, res) => {
    const notes = loadNotes();
    const newNote = { id: Date.now(), ...req.body };
    notes.push(newNote);
    saveNotes(notes);
    res.json(newNote);
});

app.put('/notes/:id', (req, res) => {
    const notes = loadNotes().map(note => note.id == req.params.id ? { ...note, ...req.body } : note);
    saveNotes(notes);
    res.json({ message: 'Note updated' });
});

app.delete('/notes/:id', (req, res) => {
    const notes = loadNotes().filter(note => note.id != req.params.id);
    saveNotes(notes);
    res.json({ message: 'Note deleted' });
});

app.delete('/notes', (req, res) => {
    saveNotes([]);
    res.json({ message: 'All notes cleared' });
});

app.listen(5000, () => console.log('Server running on port 5000'));