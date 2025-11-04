import React, { createContext, useState, useEffect } from "react";

// 1. Create the context
const FavoritesContext = createContext();

// 2. Create the Provider component
function FavoritesProvider({ children }) {
  // 3. State is initialized using a function to read from localStorage first.
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const savedFavorites = localStorage.getItem("dogFavorites");
    // If we found data in localStorage, parse it. Otherwise, start with an empty array.
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // 4. This useEffect syncs state *to* localStorage whenever favoriteIds changes.
  useEffect(() => {
    localStorage.setItem("dogFavorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // 5. Helper function to add a favorite breed ID
  const addFavorite = (breedId) => {
    // Check for duplicates before adding
    if (!favoriteIds.includes(breedId)) {
      setFavoriteIds([...favoriteIds, breedId]);
    }
  };

  // 6. Helper function to remove a favorite breed ID
  const removeFavorite = (breedId) => {
    // Create a new array that filters out the specified ID
    setFavoriteIds(favoriteIds.filter((id) => id !== breedId));
  };

  // 7. Helper function to check if a breed is already a favorite
  const isFavorite = (breedId) => {
    return favoriteIds.includes(breedId);
  };

  // 8. Define the value to be provided to consuming components
  const contextValue = {
    favoriteIds,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 9. Export the context and provider
export { FavoritesContext, FavoritesProvider };