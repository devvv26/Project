import React, { useState } from "react";
import NotesList from "./components/NotesList";
import NoteForm from "./components/NoteForm";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const clearAllNotes = () => {
    setNotes([]);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Notes App</h1>
      {!isCreating ? (
        <div>
          <button className="button" onClick={() => setIsCreating(true)}>Create Note</button>
          <h2 className="collection-title">Collection</h2>
          <button className="clear-button" onClick={clearAllNotes}>Clear All</button>
          <NotesList notes={notes} deleteNote={deleteNote} />
        </div>
      ) : (
        <NoteForm addNote={addNote} setIsCreating={setIsCreating} />
      )}
    </div>
  );
}

export default App;
