import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

// We are now receiving the 'breed' object as a prop from BreedList
function BreedCard({ breed }) {
  
  // A safety check: some breeds in the API don't have an image.
  // If breed.image exists, use its url. If not, use a placeholder.
  const imageUrl = breed.image ? breed.image.url : "https://via.placeholder.com/300x200";

  return (
    // Wrap the card in a Link that goes to our dynamic route
    <Link to={`/breed/${breed.id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem",
        width: "300px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <img 
          src={imageUrl} 
          alt={breed.name} 
          style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }} 
        />
        <h3 style={{ marginTop: "1rem" }}>{breed.name}</h3>
      </div>
    </Link>
  );
}

export default BreedCard;