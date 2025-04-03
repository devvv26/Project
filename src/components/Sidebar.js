import React from "react";

const Sidebar = ({ onShowNotes, clearNotes }) => {
  return (
    <div className="w-72 h-screen bg-gray-900 text-white p-6 flex flex-col shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">📝 Notes App</h1>

      <button
        onClick={onShowNotes}
        className="mb-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
      >
        📋 All Notes
      </button>

      <button
        onClick={clearNotes}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
      >
        🗑 Clear Notes
      </button>
    </div>
  );
};

export default Sidebar;
