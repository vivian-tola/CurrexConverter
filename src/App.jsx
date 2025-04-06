import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Blog from "./components/Blog";
import Converter from "./components/Converter";
import Footer from "./components/Footer";
import { AuthProvider } from "./Contexts/AuthContext";
import { ThemeProvider } from './Contexts/ThemeContext';
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/converter" element={<Converter />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
