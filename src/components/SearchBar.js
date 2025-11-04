import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="search">Search Breeds:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a breed name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ marginLeft: "0.5rem", padding: "0.5rem", width: "300px" }}
      />
    </div>
  );
}

export default SearchBar;