import React, { useContext } from "react"; // 1. Import useContext
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; // 2. Import our context

function NavBar() {
  // 3. Consume the context to get the current theme and the toggle function
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav style={{
      padding: "1rem",
      backgroundColor: theme === "light" ? "#f0f0f0" : "#333", // 4. Make NavBar dark-mode aware
      marginBottom: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <NavLink 
        to="/" 
        style={{ marginRight: "1rem", color: theme === "light" ? "#000" : "#fff" }}
      >
        Home
      </NavLink>
      
      {/* 5. Add the toggle button */}
      <button onClick={toggleTheme} style={{ padding: "0.5rem" }}>
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}

export default NavBar;