import React, { useState, useEffect } from "react";
import BreedCard from "./BreedCard";
import SearchBar from "./SearchBar"; // 1. Import the new component

function BreedList() {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Add new state for the search term
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchBreeds() {
      // ... (The rest of your useEffect fetch logic stays exactly the same)
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

  // 3. Create a filtered list *before* the return
  // This filters the 'breeds' array based on the 'searchTerm' state
  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <h2>Loading breeds...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  return (
    <div>
      <h2>Dog Breed Finder</h2>
      
      {/* 4. Render the SearchBar and pass it the state and setter */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {/* 5. Map over the *filtered* list instead of the full 'breeds' list */}
        {filteredBreeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
}

export default BreedList;