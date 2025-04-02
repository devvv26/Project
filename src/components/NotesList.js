import React from "react";

const NotesList = ({ notes, deleteNote }) => {
  if (!notes || notes.length === 0) {
    return <p className="text-gray-400 text-center mt-5">No notes available.</p>;
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
        >
          <h3 className="text-lg font-semibold text-white mb-2">{note.title}</h3>
          <p className="text-gray-300">{note.content}</p>
          <div className="flex gap-2 mt-3">
            <button
              className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteNote(note._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
