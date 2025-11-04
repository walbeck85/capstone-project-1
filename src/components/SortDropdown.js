import React from "react";

/**
 * This is another "controlled component", just like SearchBar.
 * It receives the current 'sortOrder' from its parent
 * and calls 'onSortChange' when the user selects a new option.
 */
function SortDropdown({ sortOrder, onSortChange }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="sort">Sort by: </label>
      <select
        id="sort"
        value={sortOrder} // Display the state from the parent
        onChange={(e) => onSortChange(e.target.value)} // Pass the new value up
        style={{ padding: "0.5rem" }}
      >
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
        <option value="weight-asc">Weight: Low to High</option>
        <option value="weight-desc">Weight: High to Low</option>
      </select>
    </div>
  );
}

export default SortDropdown;