import React from 'react'; // No longer need useContext here
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import { ThemeContext } from './context/ThemeContext'; // <-- DELETE OLD

// --- Component Imports ---
import NavBar from './components/NavBar';
import BreedList from './components/BreedList';
import ComparePage from './components/ComparePage';
// I already deleted BreedDetail, which is correct

function App() {
  // const { theme } = useContext(ThemeContext); // <-- DELETE OLD
  // <div className={`App ${theme}`}> // <-- DELETE OLD

  // MUI's CssBaseline and ThemeProvider handle all the
  // background colors and text colors for us.
  // The 'App' className can still be used for app-wide margins.
  return (
    <div className="App"> 
      <NavBar />
      <main>
        <Routes>
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/" element={<BreedList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;