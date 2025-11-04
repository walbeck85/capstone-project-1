import React, { useContext } from 'react'; // 1. Import useContext
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeContext } from './context/ThemeContext'; // 2. Import our context

import NavBar from './components/NavBar';
import BreedList from './components/BreedList';
import BreedDetail from './components/BreedDetail';

function App() {
  // 3. Consume the context to get the current theme
  const { theme } = useContext(ThemeContext);

  // 4. Conditionally apply a "dark" class to the main app container
  return (
    <div className={`App ${theme}`}>
      <NavBar />
      <main>
        <Routes>
          <Route path="/breed/:id" element={<BreedDetail />} />
          <Route path="/" element={<BreedList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;