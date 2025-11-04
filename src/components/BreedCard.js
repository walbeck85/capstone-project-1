import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

function BreedCard({ breed }) {
  // Consume the Favorites context to get its functions
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);

  // Check if this specific card's breed is in the favorites list
  const bIsFavorite = isFavorite(breed.id);

  // Helper function to safely get the correct image URL.
  // This is needed because the API sends two different data shapes.
  const getImageUrl = () => {
    if (breed.image && breed.image.url) {
      // Data from the main /breeds list
      return breed.image.url;
    }
    if (breed.reference_image_id) {
      // Data from the /breeds/:id endpoint
      return `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
    }
    // Fallback if no image is found
    return "https://via.placeholder.com/300x200";
  };
  
  const imageUrl = getImageUrl();

  // This function handles the click on the heart button
  const handleFavoriteClick = (e) => {
    // e.preventDefault() is critical. It stops the <Link>
    // from navigating to the details page when we only want to click the button.
    e.preventDefault(); 
    
    if (bIsFavorite) {
      removeFavorite(breed.id);
    } else {
      addFavorite(breed.id);
    }
  };

  return (
    // This <Link> makes the whole card clickable
    // We removed the inline 'color' style to respect dark mode
    <Link to={`/breed/${breed.id}`} style={{ textDecoration: 'none', position: 'relative' }}>
      
      {/* This button sits on top of the card */}
      <button 
        onClick={handleFavoriteClick} 
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          lineHeight: '30px',
          zIndex: 10 // Ensures button is on top of the image
        }}
      >
        {bIsFavorite ? '❤️' : '🤍'}
      </button>

      {/* The card's visual content */}
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
        {/* This h3 text color is now controlled by App.css */}
        <h3 style={{ marginTop: "1rem" }}>{breed.name}</h3>
      </div>
    </Link>
  );
}

export default BreedCard;