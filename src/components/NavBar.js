import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ 
      padding: "1rem", 
      backgroundColor: "#f0f0f0", 
      marginBottom: "1rem" 
    }}>
      <NavLink 
        to="/" 
        style={{ marginRight: "1rem" }}
      >
        Home
      </NavLink>
      {/* We can add more links here later if we want */}
    </nav>
  );
}

export default NavBar;