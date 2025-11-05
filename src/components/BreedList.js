import React, { useState, useEffect } from "react";
import BreedCard from "./BreedCard";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
// --- NEW: Import the filter and MODAL components ---
import TemperamentFilter from "./TemperamentFilter";
import Modal from "./Modal";

function BreedList() {
  // --- STATE MANAGEMENT ---
  const [breeds, setBreeds] = useState([]); // Master list from API
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Controlled search input
  const [sortOrder, setSortOrder] = useState("name-asc"); // Controlled sort input

  // --- NEW FILTER STATE ---
  const [allTemperaments, setAllTemperaments] = useState([]); // Master list of all unique temps
  const [selectedTemperaments, setSelectedTemperaments] = useState([]); // User's selections

  // --- NEW MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        // --- NEW: Calculate unique temperaments ---
        // Use a Set to store unique values
        const tempsSet = new Set();
        data.forEach((breed) => {
          if (breed.temperament) {
            // Split the string (e.g., "Playful, Curious, Stubborn")
            breed.temperament.split(", ").forEach((temp) => {
              tempsSet.add(temp.trim()); // Add the trimmed temp to the set
            });
          }
        });
        // Convert the Set to an array, sort it, and save to state
        setAllTemperaments([...tempsSet].sort());
        // --- END NEW ---
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
    const avg =
      parts.reduce((sum, val) => sum + parseInt(val, 10), 0) /
      (parts.length || 1);
    return avg;
  };

  // --- FILTERING & SORTING LOGIC ---
  // This derived array is re-calculated on every render
  const processedBreeds = breeds
    // First, filter by the search term
    .filter((breed) =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // --- NEW: Second, filter by selected temperaments ---
    .filter((breed) => {
      // If no temperaments are selected, show all breeds (return true)
      if (selectedTemperaments.length === 0) {
        return true;
      }
      // If temperaments are selected, check if the breed has all of them
      if (!breed.temperament) {
        return false; // Breed has no temperament, so it can't match
      }
      // .every() checks if ALL selected temps are present in the breed's temperament string
      return selectedTemperaments.every((temp) =>
        breed.temperament.includes(temp)
      );
    })
    // --- END NEW ---
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          maxWidth: "800px",
          margin: "auto",
          alignItems: "center", // Vertically align items
        }}
      >
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <SortDropdown sortOrder={sortOrder} onSortChange={setSortOrder} />

        {/* --- NEW: Filter Button --- */}
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "0.5rem",
            height: "fit-content",
            marginLeft: "1rem",
            backgroundColor: "#61dafb",
            border: "none",
            borderRadius: "4px",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Filter Temperaments ({selectedTemperaments.length})
        </button>
      </div>

      {/* --- REMOVED: TemperamentFilter from here --- */}

      {/* --- NEW: Modal for the filter --- */}
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Map over the final processed (filtered AND sorted) list */}
        {processedBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
}

export default BreedList;