require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB (Only once!)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Note Schema
const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", NoteSchema);

// ✅ Routes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body; // Use correct fields
  const note = new Note({ title, content });
  await note.save();
  res.json(note); // Send full note back
});

app.put("/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  res.json(updatedNote);
});

app.delete("/notes", async (req, res) => {
  try {
    await Note.deleteMany({});
    res.json({ message: "All notes deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing notes" });
  }
});




// ✅ Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Online Notes App API");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


