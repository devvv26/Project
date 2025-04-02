import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import NotesList from "./components/NotesList";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (title, content) => {
    if (!title.trim() || !content.trim()) return;

    try {
      const response = await axios.post("http://localhost:5000/notes", { title, content });
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const clearNotes = async () => {
    try {
      await axios.delete("http://localhost:5000/notes");
      setNotes([]); // Clears UI
    } catch (error) {
      console.error("Error clearing notes:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Your Notes</h2>
        <NoteForm addNote={addNote} />
        
        {/* Clear Notes Button */}
        {notes.length > 0 && (
          <button
            onClick={clearNotes}
            className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Notes
          </button>
        )}

        <NotesList notes={notes} deleteNote={deleteNote} />
      </div>
    </div>
  );
};

export default App;
