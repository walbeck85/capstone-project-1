import React from "react";

/**
 * A controlled component. It displays the sortOrder from props
 * and calls onSortChange (the setter function) when the user selects.
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