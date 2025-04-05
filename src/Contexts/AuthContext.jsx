import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate authentication API call
    return new Promise((resolve, reject) => {
      // For demo purposes, accept any non-empty email/password
      if (email && password) {
        const userData = { email, id: Date.now() };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        resolve(userData);
      } else {
        reject(new Error('Email and password are required'));
      }
    });
  };

  const register = (email, password) => {
    // Simulate registration API call
    return new Promise((resolve, reject) => {
      if (email && password && password.length >= 6) {
        const userData = { email, id: Date.now() };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        resolve(userData);
      } else {
        reject(new Error('Valid email and password (6+ characters) required'));
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
