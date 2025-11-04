import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeContext } from './context/ThemeContext';

// --- Component Imports ---
import NavBar from './components/NavBar';
import BreedList from './components/BreedList';
import BreedDetail from './components/BreedDetail';
import ComparePage from './components/ComparePage';

function App() {
  // Consume the theme context to get the current theme ('light' or 'dark')
  const { theme } = useContext(ThemeContext);

  // Apply the theme as a class to the main app container.
  // This allows App.css to control the global styles.
  return (
    <div className={`App ${theme}`}>
      <NavBar />
      <main>
        {/* The Routes component defines all valid "pages" for the app */}
        <Routes>
          {/* Dynamic route for a single breed's details */}
          <Route path="/breed/:id" element={<BreedDetail />} />
          
          {/* Route for the comparison page */}
          <Route path="/compare" element={<ComparePage />} />
          
          {/* The default home page route */}
          <Route path="/" element={<BreedList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;