import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="font-bold text-xl">Repurposer</div>
      <button className="bg-white text-indigo-600 px-4 py-1.5 rounded-md shadow hover:bg-gray-100">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
