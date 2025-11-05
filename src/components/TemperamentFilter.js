import React, { useState } from "react";
import "./TemperamentFilter.css"; // We'll create this CSS file next

/**
 * A component that displays a searchable, multi-select list of temperaments.
 *
 * @param {string[]} allTemperaments - The master list of all unique temperaments.
 * @param {string[]} selectedTemperaments - The list of currently selected temperaments.
 * @param {function} onTemperamentChange - The setter function (setSelectedTemperaments) from BreedList.
 */
function TemperamentFilter({
  allTemperaments,
  selectedTemperaments,
  onTemperamentChange,
}) {
  // --- STATE ---
  // This state is local *to this component*
  // It only controls the text in the filter's search bar
  const [filterSearchTerm, setFilterSearchTerm] = useState("");

  // --- HANDLERS ---
  /**
   * Called when a user checks or unchecks a box.
   */
  const handleCheckboxChange = (temp) => {
    if (selectedTemperaments.includes(temp)) {
      // It's already in the list, so remove it
      onTemperamentChange(selectedTemperaments.filter((t) => t !== temp));
    } else {
      // It's not in the list, so add it
      onTemperamentChange([...selectedTemperaments, temp]);
    }
  };

  // --- RENDER LOGIC ---
  // Create a derived list of temperaments to display,
  // based on the filter's local search bar
  const displayedTemperaments = allTemperaments.filter((temp) =>
    temp.toLowerCase().includes(filterSearchTerm.toLowerCase())
  );

  return (
    <div className="filter-container">
      <h3>Filter by Temperament:</h3>
      {/* 1. The search bar for the filter itself */}
      <input
        type="text"
        placeholder="Search temperaments..."
        className="filter-search"
        value={filterSearchTerm}
        onChange={(e) => setFilterSearchTerm(e.target.value)}
      />
      {/* 2. The scrollable list of checkboxes */}
      <div className="filter-list">
        {displayedTemperaments.map((temp) => (
          <label key={temp} className="filter-option">
            <input
              type="checkbox"
              value={temp}
              // The box is checked if this temp is in the global selectedTemperaments array
              checked={selectedTemperaments.includes(temp)}
              onChange={() => handleCheckboxChange(temp)}
            />
            {temp}
          </label>
        ))}
      </div>
      {/* 3. A helper to clear all selections */}
      {selectedTemperaments.length > 0 && (
        <button
          className="filter-clear"
          onClick={() => onTemperamentChange([])}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}

export default TemperamentFilter;