import React, { useContext, useState, useEffect } from "react";
import { CompareContext } from "../context/CompareContext";
import './ComparePage.css'; // We'll create this CSS file next

function ComparePage() {
  // 1. Get the list of IDs from our global context
  const { compareIds, clearCompare } = useContext(CompareContext);

  // 2. State for the fetched breed data, loading, and errors
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Fetch details for ALL breeds in the compare list
  useEffect(() => {
    if (compareIds.length === 0) {
      setIsLoading(false);
      setBreeds([]); // Ensure list is empty
      return;
    }

    async function fetchCompareBreeds() {
      setIsLoading(true);
      try {
        // Create an array of fetch promises, one for each ID
        const fetchPromises = compareIds.map(id =>
          fetch(`https://api.thedogapi.com/v1/breeds/${id}`, {
            headers: {
              "x-api-key": process.env.REACT_APP_DOG_API_KEY,
            },
          }).then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          })
        );
        
        // Wait for all fetches to complete
        const fetchedBreeds = await Promise.all(fetchPromises);
        setBreeds(fetchedBreeds);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompareBreeds();
  }, [compareIds]); // Re-run if the compare list changes

  // --- RENDER LOGIC ---
  if (isLoading) {
    return <h2>Loading comparison...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  return (
    <div className="compare-container">
      <h2>Compare Breeds</h2>
      {breeds.length === 0 ? (
        <p>You haven't selected any breeds to compare. Add up to 3!</p>
      ) : (
        <>
          <button onClick={clearCompare} style={{marginBottom: '1rem', padding: '0.5rem'}}>
            Clear Comparison
          </button>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                {/* Create a header column for each breed */}
                {breeds.map(breed => (
                  <th key={breed.id}>{breed.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Row for Image */}
              <tr>
                <td>Image</td>
                {breeds.map(breed => (
                  <td key={breed.id}>
                    <img 
                      src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`} 
                      alt={breed.name}
                      style={{width: '200px', height: '150px', objectFit: 'cover', borderRadius: '4px'}}
                    />
                  </td>
                ))}
              </tr>
              {/* Row for Temperament */}
              <tr>
                <td>Temperament</td>
                {breeds.map(breed => (
                  <td key={breed.id}>{breed.temperament}</td>
                ))}
              </tr>
              {/* Row for Life Span */}
              <tr>
                <td>Life Span</td>
                {breeds.map(breed => (
                  <td key={breed.id}>{breed.life_span}</td>
                ))}
              </tr>
              {/* Row for Weight */}
              <tr>
                <td>Weight (imperial)</td>
                {breeds.map(breed => (
                  <td key={breed.id}>{breed.weight.imperial} lbs</td>
                ))}
              </tr>
              {/* Row for Height */}
              <tr>
                <td>Height (imperial)</td>
                {breeds.map(breed => (
                  <td key={breed.id}>{breed.height.imperial} in</td>
                ))}
              </tr>
              {/* Row for Bred For */}
              <tr>
                <td>Bred For</td>
                {breeds.map(breed => (
                  <td key={breed.id}>{breed.bred_for}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ComparePage;