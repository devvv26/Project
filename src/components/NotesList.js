import React, { useState } from "react";

const NotesList = ({ notes, deleteNote }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNote, setEditedNote] = useState({ title: "", description: "" });

  const startEditing = (index, note) => {
    setEditingIndex(index);
    setEditedNote(note);
  };

  const handleEditChange = (e, field) => {
    setEditedNote({ ...editedNote, [field]: e.target.value });
  };

  const saveEdit = (index) => {
    notes[index] = editedNote;
    setEditingIndex(null);
  };

  return (
    <div className="notes-container">
      {notes.map((note, index) => (
        <div key={index} className="note-item">
          {editingIndex === index ? (
            <div>
              <input
                type="text"
                value={editedNote.title}
                onChange={(e) => handleEditChange(e, "title")}
              />
              <textarea
                value={editedNote.description}
                onChange={(e) => handleEditChange(e, "description")}
              />
              <button className="button save-button" onClick={() => saveEdit(index)}>Save</button>
            </div>
          ) : (
            <div>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
            </div>
          )}
          <div className="note-buttons">
            <button className="button edit-button" onClick={() => startEditing(index, note)}>Edit</button>
            <button className="button delete-button" onClick={() => deleteNote(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
