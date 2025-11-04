import React, { createContext, useState } from "react";

// 1. Create the context
const CompareContext = createContext();

// 2. Create the Provider component
function CompareProvider({ children }) {
  // 3. State to hold breed IDs
  const [compareIds, setCompareIds] = useState([]);

  // 4. Helper to add a breed (max 3)
  const addCompare = (breedId) => {
    if (!compareIds.includes(breedId) && compareIds.length < 3) {
      setCompareIds([...compareIds, breedId]);
    }
  };

  // 5. Helper to remove a breed
  const removeCompare = (breedId) => {
    setCompareIds(compareIds.filter((id) => id !== breedId));
  };

  // 6. Helper to check if a breed is in the list
  const isInCompare = (breedId) => {
    return compareIds.includes(breedId);
  };

  // 7. Helper to clear the list
  const clearCompare = () => {
    setCompareIds([]);
  };

  // 8. Provide state and functions to all children
  return (
    <CompareContext.Provider 
      value={{ 
        compareIds, 
        addCompare, 
        removeCompare, 
        isInCompare,
        clearCompare,
        compareCount: compareIds.length 
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

// 9. Export the correct context and provider
export { CompareContext, CompareProvider };