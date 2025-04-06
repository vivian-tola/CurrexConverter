import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has previously set a theme preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme');
      if (storedPrefs) {
        return storedPrefs === 'true';
      }
      
      // If no stored preference, check browser preference
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return true;
      }
    }
    
    // Default to light mode
    return false;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme());

  // Apply theme to the document
  const applyTheme = (isDark) => {
    const rootElement = window.document.documentElement;
    
    if (isDark) {
      rootElement.classList.add('dark');
      rootElement.setAttribute('data-theme', 'dark');
    } else {
      rootElement.classList.remove('dark');
      rootElement.setAttribute('data-theme', 'light');
    }
    
    localStorage.setItem('color-theme', isDark);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};