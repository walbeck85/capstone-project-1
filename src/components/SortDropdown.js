import React from "react";

/**
 * A controlled component for selecting the sort order.
 * It receives the current sortOrder and the onSortChange handler
 * from its parent (BreedList).
 */
function SortDropdown({ sortOrder, onSortChange }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="sort">Sort by: </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
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