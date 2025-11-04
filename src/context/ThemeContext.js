import React, { createContext, useState } from "react";

// 1. Create the context object
const ThemeContext = createContext();

// 2. Create the Provider component that will "wrap" our app
function ThemeProvider({ children }) {
  // State to hold the current theme, defaulting to "light"
  const [theme, setTheme] = useState("light");

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 3. Define the value to be passed down to all consuming components
  const contextValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Export both the context and the provider
export { ThemeContext, ThemeProvider };