import React, { createContext, useState } from "react";

// 1. Create the context object. This is what components will import to "consume" the state.
const ThemeContext = createContext();

// 2. Create the Provider component. This component will wrap our app and "provide" the state.
function ThemeProvider({ children }) {
  // State to hold the current theme. "light" is the default.
  const [theme, setTheme] = useState("light");

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 3. Define the "value" object to be passed down.
  // We pass both the current theme and the function to change it.
  const contextValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Export both the context and the provider
export { ThemeContext, ThemeProvider };