import React, { useState, useEffect } from "react";
import BreedCard from "./BreedCard"; // We'll update this next

function BreedList() {
  // 1. The 3-state system you learned in SE05-M02
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. The useEffect hook to fetch data when the component mounts
  useEffect(() => {
    
    async function fetchBreeds() {
      try {
        const response = await fetch("https://api.thedogapi.com/v1/breeds", {
          headers: {
            // This reads your key from the .env file
            "x-api-key": process.env.REACT_APP_DOG_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBreeds(data); // Put the loaded data into state
      } catch (e) {
        setError(e.message); // Put any errors into state
      } finally {
        setIsLoading(false); // Always stop loading, whether it worked or failed
      }
    }

    fetchBreeds();
  }, []); // The empty array [] means this runs only once

  // 3. Conditional rendering based on our 3 states
  if (isLoading) {
    return <h2>Loading breeds...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  // 4. If not loading and no error, show the data
  return (
    <div>
      <h2>Dog Breed Finder</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {breeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </div>
    </div>
  );
}

export default BreedList;