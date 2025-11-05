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
        {/* === NEW OPTIONS BELOW === */}
        <option value="height-asc">Height: Short to Tall</option>
        <option value="height-desc">Height: Tall to Short</option>
        <option value="lifespan-asc">Lifespan: Short to Long</option>
        <option value="lifespan-desc">Lifespan: Long to Short</option>
      </select>
    </div>
  );
}

export default SortDropdown;