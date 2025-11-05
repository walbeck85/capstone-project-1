import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { CompareContext } from "../context/CompareContext";

function NavBar() {
  // Consume both global contexts
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { compareCount } = useContext(CompareContext);

  // Helper style object to make links react to the theme
  const linkStyle = {
    marginRight: "1rem",
    color: theme === "light" ? "#000" : "#fff",
  };

  return (
    <nav
      style={{
        padding: "1rem",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333", // Theme-aware background
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // --- UX FIXES APPLIED ---
        position: "sticky", // Make the nav bar "stick"
        top: 0, // Stick it to the top of the viewport
        zIndex: 10, // Ensure it stays above other content
        // --- END UX FIXES ---
      }}
    >
      {/* Page Navigation */}
      <div>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/compare" style={linkStyle}>
          Compare ({compareCount}) {/* Shows live count */}
        </NavLink>
      </div>

      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} style={{ padding: "0.5rem" }}>
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}

export default NavBar;