import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams to read the URL

function BreedDetail() {
  // 1. Get the dynamic ':id' from the URL
  const { id } = useParams();

  // 2. The 3-state system for our single breed
  const [breedInfo, setBreedInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. The useEffect hook, this time dependent on [id]
  useEffect(() => {
    // Only run if the 'id' exists
    if (!id) return;

    async function fetchBreedDetail() {
      setIsLoading(true); // Start loading
      try {
        // Use the 'id' from useParams to build the fetch URL
        const response = await fetch(`https://api.thedogapi.com/v1/breeds/${id}`, {
          headers: {
            "x-api-key": process.env.REACT_APP_DOG_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBreedInfo(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }

    fetchBreedDetail();
  }, [id]); // Dependency array: This effect re-runs *if* the 'id' in the URL changes

  // 4. Conditional rendering
  if (isLoading) {
    return <h2>Loading breed details...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  if (!breedInfo) {
    return <h2>Breed not found.</h2>; // Handle case where data is empty
  }

  // 5. The main render: Show the details
  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/">&larr; Back to all breeds</Link>
      <div style={{ display: "flex", marginTop: "2rem" }}>
        <img
          // The breed endpoint gives an image_id, not a full URL
          // We must construct the image URL ourselves
          src={`https://cdn2.thedogapi.com/images/${breedInfo.reference_image_id}.jpg`}
          alt={breedInfo.name}
          style={{ width: "400px", height: "400px", objectFit: "cover", borderRadius: "8px" }}
        />
        <div style={{ marginLeft: "2rem" }}>
          <h1>{breedInfo.name}</h1>
          <p><strong>Temperament:</strong> {breedInfo.temperament}</p>
          <p><strong>Bred For:</strong> {breedInfo.bred_for}</p>
          <p><strong>Life Span:</strong> {breedInfo.life_span}</p>
          <p><strong>Weight:</strong> {breedInfo.weight.imperial} lbs ({breedInfo.weight.metric} kg)</p>
          <p><strong>Height:</strong> {breedInfo.height.imperial} in ({breedInfo.height.metric} cm)</p>
        </div>
      </div>
    </div>
  );
}

export default BreedDetail;