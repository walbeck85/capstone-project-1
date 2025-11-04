import React, { useContext, useState, useEffect } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import BreedCard from "./BreedCard";

function FavoritesPage() {
  // 1. Get the list of favorite IDs from our global context
  const { favoriteIds } = useContext(FavoritesContext);

  // 2. We'll need our own state for the fetched breed data, loading, and errors
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Fetch details for ALL favorited breeds
  useEffect(() => {
    // Don't fetch if there are no favorites
    if (favoriteIds.length === 0) {
      setIsLoading(false);
      return;
    }

    async function fetchFavorites() {
      try {
        // Create an array of fetch promises, one for each ID
        const fetchPromises = favoriteIds.map(id =>
          fetch(`https://api.thedogapi.com/v1/breeds/${id}`, {
            headers: {
              "x-api-key": process.env.REACT_APP_DOG_API_KEY,
            },
          }).then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          })
        );
        
        // Wait for all fetches to complete
        const fetchedBreeds = await Promise.all(fetchPromises);
        setFavorites(fetchedBreeds);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFavorites();
  }, [favoriteIds]); // Re-run this effect if the list of favoriteIds changes

  // --- RENDER LOGIC ---
  if (isLoading) {
    return <h2>Loading favorites...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>You haven't favorited any breeds yet!</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {/* We can reuse our BreedCard component! */}
          {favorites.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;