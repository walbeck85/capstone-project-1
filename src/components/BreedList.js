import React, { useState, useEffect } from "react";
import BreedCard from "./BreedCard";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

function BreedList() {
  // --- STATE MANAGEMENT ---
  // State for the master list of breeds fetched from the API
  const [breeds, setBreeds] = useState([]);
  // State for the loading message
  const [isLoading, setIsLoading] = useState(true);
  // State for any fetch errors
  const [error, setError] = useState(null);
  // State for the controlled SearchBar component
  const [searchTerm, setSearchTerm] = useState("");
  // State for the controlled SortDropdown component
  const [sortOrder, setSortOrder] = useState("name-asc"); // Default sort

  // --- DATA FETCHING ---
  // This effect runs once when the component first mounts (due to `[]`)
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
        setBreeds(data); // Load fetched data into state
      } catch (e) {
        setError(e.message); // Store error message
      } finally {
        setIsLoading(false); // Hide loading message
      }
    }
    fetchBreeds();
  }, []);

  // --- HELPER FUNCTION ---
  // Parses the weight string (e.g., "6 - 13") and returns the average
  const getAverageWeight = (breed) => {
    if (!breed.weight || !breed.weight.imperial) {
      return 0; // Return 0 for breeds with missing weight data
    }
    const parts = breed.weight.imperial.split(" - ");
    // Convert parts to numbers, sum them, and divide by count
    const avg = parts.reduce((sum, val) => sum + parseInt(val, 10), 0) / (parts.length || 1);
    return avg;
  };

  // --- FILTERING & SORTING LOGIC ---
  // This derived state is re-calculated on every render
  const processedBreeds = breeds
    // First, filter the list based on the search term
    .filter((breed) =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Next, sort the *filtered* list based on the sort order
    .sort((a, b) => {
      switch (sortOrder) {
        case "name-asc":
          return a.name.localeCompare(b.name); // A-Z
        case "name-desc":
          return b.name.localeCompare(a.name); // Z-A
        case "weight-asc":
          return getAverageWeight(a) - getAverageWeight(b); // Low-High
        case "weight-desc":
          return getAverageWeight(b) - getAverageWeight(a); // High-Low
        default:
          return 0;
      }
    });

  // --- RENDER LOGIC ---
  // Show loading message
  if (isLoading) {
    return <h2>Loading breeds...</h2>;
  }
  // Show error message
  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }
  // Show the page content
  return (
    <div>
      <h2>Dog Breed Finder</h2>
      
      {/* Controls: Pass state and setters down as props */}
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '800px', margin: 'auto' }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <SortDropdown sortOrder={sortOrder} onSortChange={setSortOrder} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {/* Map over the processed (filtered and sorted) list */}
        {processedBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
}

export default BreedList;