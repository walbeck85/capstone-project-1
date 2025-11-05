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

        // --- Calculate all temperaments ---
        const temperamentsSet = new Set();
        data.forEach(breed => {
          if (breed.temperament) {
            breed.temperament.split(', ').forEach(temp => temperamentsSet.add(temp.trim()));
          }
        });
        setAllTemperaments([...temperamentsSet].sort()); 

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
    .filter((breed) =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((breed) => {
      if (selectedTemperaments.length === 0) return true;
      if (!breed.temperament) return false;
      return selectedTemperaments.every(temp => 
        breed.temperament.includes(temp)
      );
    })
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
        
        <button className="filter-button" onClick={() => setIsModalOpen(true)}>
          Filter Temperaments ({selectedTemperaments.length})
        </button>

        {/* *** THIS IS THE NEW BUTTON ***
           It only appears if there are selected temperaments
        */}
        {selectedTemperaments.length > 0 && (
          <button 
            className="clear-button" 
            onClick={() => setSelectedTemperaments([])}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* --- Modal for Filtering --- */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <TemperamentFilter
            allTemperaments={allTemperaments}
            selectedTemperaments={selectedTemperaments}
            onTemperamentChange={setSelectedTemperaments}
          />
        </Modal>
      )}

      {/* Grid Display Area */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem",
        justifyItems: "center",
        maxWidth: "1400px",
        margin: "1.5rem auto"
      }}>
        {processedBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
}

export default BreedList;