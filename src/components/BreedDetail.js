import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams

function BreedDetail() {
  // useParams() reads the dynamic ':id' from the URL
  const { id } = useParams();

  // 3-state system for this page's specific data
  const [breedInfo, setBreedInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // This effect fetches data for *this specific breed*
  useEffect(() => {
    if (!id) return; // Don't fetch if ID isn't in URL

    async function fetchBreedDetail() {
      setIsLoading(true);
      try {
        // Use the 'id' from the URL to build the API request
        const response = await fetch(
          `https://api.thedogapi.com/v1/breeds/${id}`,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_DOG_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBreedInfo(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBreedDetail();
  }, [id]); // Dependency array: This effect re-runs if the 'id' changes

  // --- RENDER LOGIC ---
  if (isLoading) {
    return <h2>Loading breed details...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  if (!breedInfo) {
    return <h2>Breed not found.</h2>;
  }

  // Show the loaded details
  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/">&larr; Back to all breeds</Link>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "2rem" }}>
        <img
          // This endpoint returns a 'reference_image_id', so we build the URL
          src={`https://cdn2.thedogapi.com/images/${breedInfo.reference_image_id}.jpg`}
          alt={breedInfo.name}
          style={{
            width: "400px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            minWidth: "300px",
          }}
        />
        <div style={{ marginLeft: "2rem", flex: 1, minWidth: "300px" }}>
          <h1>{breedInfo.name}</h1>
          <p>
            <strong>Temperament:</strong> {breedInfo.temperament}
          </p>
          <p>
            <strong>Bred For:</strong> {breedInfo.bred_for || "N/A"}
          </p>
          {/* --- NEW FIELDS ADDED --- */}
          <p>
            <strong>Breed Group:</strong> {breedInfo.breed_group || "N/A"}
          </p>
          <p>
            <strong>Origin:</strong> {breedInfo.origin || "N/A"}
          </p>
          {/* --- END NEW FIELDS --- */}
          <p>
            <strong>Life Span:</strong> {breedInfo.life_span}
          </p>
          <p>
            <strong>Weight:</strong> {breedInfo.weight.imperial} lbs (
            {breedInfo.weight.metric} kg)
          </p>
          <p>
            <strong>Height:</strong> {breedInfo.height.imperial} in (
            {breedInfo.height.metric} cm)
          </p>
        </div>
      </div>
    </div>
  );
}

export default BreedDetail;