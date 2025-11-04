import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// We'll create these components in the next steps.
// For now, we'll just use placeholder functions.
const BreedList = () => <h2>Home Page: Breed List</h2>;
const BreedDetail = () => <h2>Details Page for One Breed</h2>;

// Placeholder NavBar
const NavBar = () => (
  <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
    <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
  </nav>
);

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/breed/:id" element={<BreedDetail />} />
        <Route path="/" element={<BreedList />} />
      </Routes>
    </div>
  );
}

export default App;