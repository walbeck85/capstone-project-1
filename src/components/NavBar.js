import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAppTheme } from "../context/AppThemeProvider"; // <-- IMPORT NEW HOOK
import { CompareContext } from "../context/CompareContext";
// --- THIS LINE IS THE FIX ---
// I've removed 'Box' from the import list
import { AppBar, Toolbar, Typography, Button } from '@mui/material'; // <-- IMPORT MUI
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon

function NavBar() {
  // Consume contexts
  const { mode, toggleTheme } = useAppTheme(); // <-- Use new hook
  const { compareCount } = useContext(CompareContext);

  // Define a style for the NavLink, as it's not an MUI component
  // We'll make it look like the other text
  const navLinkStyle = ({ isActive }) => ({
    color: 'inherit', // Inherits white/black from AppBar
    textDecoration: isActive ? 'underline' : 'none',
    marginRight: '1rem',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    // <AppBar> is the new <nav>. 'position="sticky"' makes it sticky!
    <AppBar position="sticky">
      {/* <Toolbar> handles the padding and flex layout */}
      <Toolbar>
        {/* <Typography> is for text. flexGrow: 1 pushes everything else to the right */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to="/" style={navLinkStyle}>
            Dog Breed Finder
          </NavLink>
          <NavLink to="/compare" style={navLinkStyle}>
            Compare ({compareCount})
          </NavLink>
        </Typography>
        
        {/* <Button> is the new <button>. 'color="inherit"' makes it match */}
        <Button 
          color="inherit" 
          onClick={toggleTheme}
          startIcon={mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        >
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;