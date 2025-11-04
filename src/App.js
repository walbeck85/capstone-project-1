import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import our real components
import NavBar from './components/NavBar';
import BreedList from './components/BreedList';
import BreedDetail from './components/BreedDetail';

function App() {
  return (
    <div className="App">
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