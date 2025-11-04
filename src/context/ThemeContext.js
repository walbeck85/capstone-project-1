import React, { createContext, useState } from "react";

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the Provider component
function ThemeProvider({ children }) {
  // State to hold the current theme. "light" is the default.
  const [theme, setTheme] = useState("light");

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 3. Provide the theme state and the toggle function to all children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Export the context and provider
export { ThemeContext, ThemeProvider };