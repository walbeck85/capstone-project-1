import React, { useState, useMemo } from 'react';
// We just need the CSS file, no JS component
import './TemperamentFilter.css';

/**
 * A filter component with a search bar and a multi-select list.
 */
function TemperamentFilter({ allTemperaments, selectedTemperaments, onTemperamentChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize the filtering calculation so it only re-runs when
  // the search term or the master list changes.
  const filteredTemperaments = useMemo(() => {
    return allTemperaments.filter(temp =>
      temp.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTemperaments, searchTerm]);

  // Handler for when a checkbox is clicked
  const handleCheckboxChange = (temperament) => {
    // Check if the temperament is already selected
    if (selectedTemperaments.includes(temperament)) {
      // If yes, filter it out (remove it)
      onTemperamentChange(
        selectedTemperaments.filter(t => t !== temperament)
      );
    } else {
      // If no, add it to the list
      onTemperamentChange([...selectedTemperaments, temperament]);
    }
  };

  return (
    <div className="filter-container">
      <h3>Filter by Temperament:</h3>
      <input
        type="text"
        placeholder="Search temperaments..."
        className="filter-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="filter-list">
        {filteredTemperaments.map(temp => (
          
          // *** THIS IS THE FIX ***
          // We wrap each item in a <div>
          // This div is a block element and will force a new line,
          // guaranteeing our single-column layout.
          <div key={temp} className="filter-list-item">
            <label>
              <input
                type="checkbox"
                checked={selectedTemperaments.includes(temp)}
                onChange={() => handleCheckboxChange(temp)}
              />
              {temp}
            </label>
          </div>

        ))}
      </div>
    </div>
  );
}

export default TemperamentFilter;