import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeContext } from './context/ThemeContext';

// --- Component Imports ---
import NavBar from './components/NavBar';
import BreedList from './components/BreedList';
import BreedDetail from './components/BreedDetail';
import FavoritesPage from './components/FavoritesPage';

function App() {
  // Consume the theme context to get the current theme state.
  const { theme } = useContext(ThemeContext);

  // Conditionally apply the theme class to the main div.
  // This class ('light' or 'dark') is used by App.css for styling.
  return (
    <div className={`App ${theme}`}>
      <NavBar />
      <main>
        {/* Routes defines all the "pages" in our app.
          React Router will render the correct 'element' based on the URL path.
        */}
        <Routes>
          {/* A dynamic route: :id will be a URL parameter */}
          <Route path="/breed/:id" element={<BreedDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          {/* The home page route */}
          <Route path="/" element={<BreedList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;