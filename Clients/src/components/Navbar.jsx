import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("isUser");
  navigate("/login");
};

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="relative max-w-7xl mx-auto flex items-center justify-center py-4">

        <div className="absolute right-0">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:opacity-80 transition"
        >
          🛍️ BAZAR
        </Link>

      </div>
    </header>
  );
};

export default Navbar;