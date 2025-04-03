import React, { useState } from "react";

const NoteForm = ({ addNote, setIsCreating }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (title.trim() || description.trim()) {
      addNote({ title, description });
      setIsCreating(false); 
    }
  };

  return (
    <div className="note-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write Anything..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="button-container">
        <button className="button" onClick={() => setIsCreating(false)}>Back</button>
        <button className="button save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default NoteForm;
