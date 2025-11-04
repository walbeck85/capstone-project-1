import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function NavBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Helper style for NavLinks
  const linkStyle = {
    marginRight: "1rem",
    color: theme === "light" ? "#000" : "#fff"
  };

  return (
    <nav style={{
      padding: "1rem",
      backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
      marginBottom: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        {/* Add the new link to the Favorites page */}
        <NavLink to="/favorites" style={linkStyle}>
          Favorites
        </NavLink>
      </div>
      
      <button onClick={toggleTheme} style={{ padding: "0.5rem" }}>
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}

export default NavBar;