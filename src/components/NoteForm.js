import React, { useState } from "react";

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 bg-gray-700 text-white rounded outline-none"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 bg-gray-700 text-white rounded outline-none h-20"
      ></textarea>
      <button className="w-full py-2 mt-3 bg-blue-600 text-white rounded hover:bg-blue-700">
        Save
      </button>
    </form>
  );
};

export default NoteForm;
