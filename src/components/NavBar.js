import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; // Import theme context

function NavBar() {
  // Consume the theme context to get its values
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Helper style object to keep NavLink styles consistent
  // This makes the link color update based on the theme
  const linkStyle = {
    marginRight: "1rem",
    color: theme === "light" ? "#000" : "#fff"
  };

  return (
    <nav style={{
      padding: "1rem",
      backgroundColor: theme === "light" ? "#f0f0f0" : "#333", // Dynamic background
      marginBottom: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      {/* Navigation Links */}
      <div>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/favorites" style={linkStyle}>
          Favorites
        </NavLink>
      </div>
      
      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} style={{ padding: "0.5rem" }}>
        {/* The button text dynamically changes */}
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}

export default NavBar;