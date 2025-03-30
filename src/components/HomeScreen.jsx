import { FaSun, FaMoon } from "react-icons/fa";
import { useState } from "react";
const HomeScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen flex flex-col items-center justify-center h-screen bg-gray-100`}
    >
      <h1 className="text-4xl font-bold mb-4">Currex</h1>
      <p className="text-lg text-gray-700 mb-6">Convert your currency now!</p>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
      >
        START
      </button>
    </div>
  );
};
export default HomeScreen;
