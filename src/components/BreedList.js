import React, { useState, useEffect } from "react";
import BreedCard from "./BreedCard";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import TemperamentFilter from "./TemperamentFilter"; // Import new component
import Modal from "./Modal"; // Import Modal
import "./TemperamentFilter.css"; // Import CSS for filter

function BreedList() {
  // --- STATE MANAGEMENT ---
  const [breeds, setBreeds] = useState([]); // Master list from API
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Controlled search input
  const [sortOrder, setSortOrder] = useState("name-asc"); // Controlled sort input

  // --- NEW FILTER STATE ---
  const [allTemperaments, setAllTemperaments] = useState([]); // Master list of unique temperaments
  const [selectedTemperaments, setSelectedTemperaments] = useState([]); // User's selected temperaments
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  // --- DATA FETCHING ---
  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await fetch("https://api.thedogapi.com/v1/breeds", {
          headers: {
            "x-api-key": process.env.REACT_APP_DOG_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBreeds(data);

        // --- NEW: Calculate all temperaments ---
        const temperamentsSet = new Set();
        data.forEach(breed => {
          if (breed.temperament) {
            breed.temperament.split(', ').forEach(temp => temperamentsSet.add(temp.trim()));
          }
        });
        setAllTemperaments([...temperamentsSet].sort()); // Convert Set to sorted Array

      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBreeds();
  }, []); 

  // --- HELPER FUNCTION (for sorting) ---
  const getAverageWeight = (breed) => {
    if (!breed.weight || !breed.weight.imperial) return 0;
    const parts = breed.weight.imperial.split(" - ");
    const avg = parts.reduce((sum, val) => sum + parseInt(val, 10), 0) / (parts.length || 1);
    return avg;
  };

  // --- FILTERING & SORTING LOGIC ---
  const processedBreeds = breeds
    // First, filter by the search term
    .filter((breed) =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // --- NEW: Second, filter by selected temperaments ---
    .filter((breed) => {
      if (selectedTemperaments.length === 0) return true; // Show all if none are selected
      if (!breed.temperament) return false; // Hide if breed has no temperament data
      // Check if ALL selected temperaments are in the breed's temperament string
      return selectedTemperaments.every(temp => 
        breed.temperament.includes(temp)
      );
    })
    // Next, sort the filtered list
    .sort((a, b) => {
      switch (sortOrder) {
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "weight-asc": return getAverageWeight(a) - getAverageWeight(b);
        case "weight-desc": return getAverageWeight(b) - getAverageWeight(a);
        default: return 0;
      }
    });

  // --- RENDER LOGIC ---
  if (isLoading) return <h2>Loading breeds...</h2>;
  if (error) return <h2 style={{ color: "red" }}>Error: {error}</h2>;

  return (
    <div style={{ padding: "0 1rem" }}>
      <h2>Dog Breed Finder</h2>
      
      {/* Controls Area */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem', maxWidth: '1000px', margin: 'auto' }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <SortDropdown sortOrder={sortOrder} onSortChange={setSortOrder} />
        {/* --- NEW: Filter Button --- */}
        <button className="filter-button" onClick={() => setIsModalOpen(true)}>
          Filter Temperaments ({selectedTemperaments.length})
        </button>
      </div>

      {/* --- NEW: Modal for Filtering --- */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <TemperamentFilter
            allTemperaments={allTemperaments}
            selectedTemperaments={selectedTemperaments}
            onTemperamentChange={setSelectedTemperaments}
          />
        </Modal>
      )}

      {/* === THIS IS THE FIX ===
          Changed from 'display: flex' to 'display: grid'
          This forces all cards to be the same height
      */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Responsive columns
        gap: "1.5rem", // Handles spacing between cards
        justifyItems: "center", // Centers cards in their grid columns
        maxWidth: "1400px",
        margin: "1.5rem auto"
      }}>
        {/* Map over the final processed (filtered AND sorted) list */}
        {processedBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
}

export default BreedList;