import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-full p-4">
      <h1 className="text-xl font-bold text-white mb-6">📒 Notes App</h1>
      <button className="w-full py-2 mb-3 bg-blue-600 text-white rounded hover:bg-blue-700">
        Notes
      </button>
    </div>
  );
};

export default Sidebar;
