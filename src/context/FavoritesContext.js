import React, { createContext, useState, useEffect } from "react";

// 1. Create the context
const FavoritesContext = createContext();

// 2. Create the Provider component
function FavoritesProvider({ children }) {
  // 3. State is initialized from localStorage, or an empty array
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem("dogFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  // 4. UseEffect to SAVE to localStorage whenever favoriteIds changes
  useEffect(() => {
    localStorage.setItem("dogFavorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // 5. Helper function to add a favorite
  const addFavorite = (breedId) => {
    // Add the id if it's not already there
    if (!favoriteIds.includes(breedId)) {
      setFavoriteIds([...favoriteIds, breedId]);
    }
  };

  // 6. Helper function to remove a favorite
  const removeFavorite = (breedId) => {
    // Filter out the id
    setFavoriteIds(favoriteIds.filter((id) => id !== breedId));
  };

  // 7. Check if a breed is already a favorite
  const isFavorite = (breedId) => {
    return favoriteIds.includes(breedId);
  };

  // 8. Provide the state and functions to all children
  return (
    <FavoritesContext.Provider 
      value={{ 
        favoriteIds, 
        addFavorite, 
        removeFavorite, 
        isFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// 9. Export the context and provider
export { FavoritesContext, FavoritesProvider };