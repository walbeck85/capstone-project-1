import React from "react";

/**
 * This is a "controlled component".
 * It doesn't own any state. It just displays the 'searchTerm' prop
 * and calls the 'onSearchChange' prop (which is setSearchTerm)
 * whenever the user types.
 */
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="search">Search Breeds:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a breed name..."
        value={searchTerm} // Display the state from the parent
        onChange={(e) => onSearchChange(e.target.value)} // Pass the new value up to the parent
        style={{ marginLeft: "0.5rem", padding: "0.5rem", width: "300px" }}
      />
    </div>
  );
}

export default SearchBar;