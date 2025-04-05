import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-yellow-400 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          CurrencyConverter
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/converter" className="hover:underline">
            Converter
          </Link>
          <Link to="/blog" className="hover:underline">
            Blog
          </Link>
          {user ? (
            <button
              onClick={logout}
              className="bg-white text-yellow-500 px-4 py-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-yellow-500 px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
