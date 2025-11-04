import React, { useState, useEffect } from "react";
import BreedCard from "./BreedCard";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

function BreedList() {
  // --- STATE MANAGEMENT ---
  const [breeds, setBreeds] = useState([]); // Master list from API
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Controlled search input
  const [sortOrder, setSortOrder] = useState("name-asc"); // Controlled sort input

  // --- DATA FETCHING ---
  // Runs once on component mount to load all breeds
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
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBreeds();
  }, []); // Empty array `[]` means this runs one time

  // --- HELPER FUNCTION ---
  // Parses weight string (e.g., "6 - 13") and returns an avg. number
  const getAverageWeight = (breed) => {
    if (!breed.weight || !breed.weight.imperial) {
      return 0; // Handle missing data
    }
    const parts = breed.weight.imperial.split(" - ");
    const avg = parts.reduce((sum, val) => sum + parseInt(val, 10), 0) / (parts.length || 1);
    return avg;
  };

  // --- FILTERING & SORTING LOGIC ---
  // This derived array is re-calculated on every render
  const processedBreeds = breeds
    // First, filter by the search term
    .filter((breed) =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Next, sort the filtered list
    .sort((a, b) => {
      switch (sortOrder) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "weight-asc":
          return getAverageWeight(a) - getAverageWeight(b);
        case "weight-desc":
          return getAverageWeight(b) - getAverageWeight(a);
        default:
          return 0;
      }
    });

  // --- RENDER LOGIC ---
  if (isLoading) {
    return <h2>Loading breeds...</h2>;
  }
  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  return (
    <div>
      <h2>Dog Breed Finder</h2>
      
      {/* Controls Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '800px', margin: 'auto' }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <SortDropdown sortOrder={sortOrder} onSortChange={setSortOrder} />
      </div>

      {/* Grid Display Area */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {/* Map over the final processed (filtered AND sorted) list */}
        {processedBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
}

export default BreedList;