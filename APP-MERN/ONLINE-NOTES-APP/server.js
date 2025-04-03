const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;
const notesFile = './data/notes.json';

app.use(express.json());
app.use(cors());

// Ensure notes file exists
if (!fs.existsSync(notesFile)) {
    fs.writeFileSync(notesFile, '[]', 'utf8');
}

app.get('/api/notes', (req, res) => {
  fs.readFile(notesFile, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Failed to read notes' });
      try {
          const notes = JSON.parse(data);
          res.json(Array.isArray(notes) ? notes : []); // Always return an array
      } catch (parseError) {
          res.json([]); // Handle JSON parse errors
      }
  });
});


app.post('/api/notes', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Title and description are required' });

    fs.readFile(notesFile, 'utf8', (err, data) => {
        let notes = data ? JSON.parse(data) : [];
        notes.push({ title, description });

        fs.writeFile(notesFile, JSON.stringify(notes, null, 2), 'utf8', (writeErr) => {
            if (writeErr) return res.status(500).json({ error: 'Failed to save note' });
            res.json({ message: 'Note saved successfully', note: { title, description } });
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));