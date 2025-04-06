import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useTheme } from '../Hooks/useTheme';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();
  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-yellow-400'} text-white p-4 transition-colors duration-200`}>
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">CurrencyConverter</Link>
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/converter" className="hover:underline">Converter</Link>
        <Link to="/blog" className="hover:underline">Blog</Link>
        <ThemeToggle />
        {user ? (
          <button 
            onClick={logout} 
            className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} ${darkMode ? 'text-white' : 'text-yellow-500'} px-4 py-2 rounded transition-colors duration-200`}
          >
            Logout
          </button>
        ) : (
          <Link 
            to="/login" 
            className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} ${darkMode ? 'text-white' : 'text-yellow-500'} px-4 py-2 rounded transition-colors duration-200`}
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
