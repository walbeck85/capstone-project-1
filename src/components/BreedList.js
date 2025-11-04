import React, { useState, useEffect } from "react";
import BreedCard from "./BreedCard";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown"; // 1. Import the new SortDropdown

function BreedList() {
  // --- STATE ---
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // 2. Add new state for the sort order
  const [sortOrder, setSortOrder] = useState("name-asc"); // Default sort

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
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBreeds();
  }, []);

  // --- HELPER FUNCTION ---
  /**
   * Parses the weight string (e.g., "6 - 13") and returns the
   * average weight as a number. Returns 0 if data is missing.
   */
  const getAverageWeight = (breed) => {
    if (!breed.weight || !breed.weight.imperial) {
      return 0; // Handle missing data
    }
    const parts = breed.weight.imperial.split(" - ");
    const avg = parts.reduce((sum, val) => sum + parseInt(val, 10), 0) / (parts.length || 1);
    return avg;
  };

  // --- FILTERING & SORTING LOGIC ---
  // 3. Apply search filter first, then apply sorting
  const processedBreeds = breeds
    .filter((breed) =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case "name-asc":
          return a.name.localeCompare(b.name); // A-Z
        case "name-desc":
          return b.name.localeCompare(a.name); // Z-A
        case "weight-asc":
          // Sort by average weight, low to high
          return getAverageWeight(a) - getAverageWeight(b);
        case "weight-desc":
          // Sort by average weight, high to low
          return getAverageWeight(b) - getAverageWeight(a);
        default:
          return 0; // No sort
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
      
      {/* 4. Add the controls, passing state and setters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '800px', margin: 'auto' }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <SortDropdown sortOrder={sortOrder} onSortChange={setSortOrder} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {/* 5. Map over the *processed* list (filtered and sorted) */}
        {processedBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
}

export default BreedList;