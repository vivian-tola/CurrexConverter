import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useTheme } from '../Hooks/useTheme';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200 min-h-screen py-12`}>
      <div className="container mx-auto max-w-md p-4">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 transition-colors duration-200`}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className={`block ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                required
              />
            </div>
            
            <button
              type="submit"
              className={`w-full ${darkMode ? 'bg-blue-500 hover:bg-yellow-400' : 'bg-yellow-400 hover:bg-blue-700'} text-white py-2 px-4 rounded focus:outline-none transition-colors duration-200`}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className={`${darkMode ? 'text-blue-400' : 'text-yellow-500'} hover:underline`}
            >
              {isLogin 
                ? "Don't have an account? Register" 
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
