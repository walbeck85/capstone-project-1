import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeContext } from './context/ThemeContext';

import NavBar from './components/NavBar';
import BreedList from './components/BreedList';
import BreedDetail from './components/BreedDetail';
import ComparePage from './components/ComparePage'; // Correct import

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <NavBar />
      <main>
        <Routes>
          <Route path="/breed/:id" element={<BreedDetail />} />
          <Route path="/compare" element={<ComparePage />} /> {/* Correct route */}
          <Route path="/" element={<BreedList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;