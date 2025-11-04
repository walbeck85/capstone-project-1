import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

function BreedCard({ breed }) {
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const bIsFavorite = isFavorite(breed.id);

  // --- THIS IS THE FIX ---
  // We'll create a helper function to find the correct image URL
  // no matter what kind of object 'breed' is.
  const getImageUrl = () => {
    // 1. Check if it has the 'image' object (from the /breeds list)
    if (breed.image && breed.image.url) {
      return breed.image.url;
    }
    // 2. Check if it has the 'reference_image_id' (from the /breeds/:id endpoint)
    if (breed.reference_image_id) {
      return `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
    }
    // 3. Fallback to a placeholder
    return "https://via.placeholder.com/300x200";
  };
  
  const imageUrl = getImageUrl();
  // --- END OF FIX ---

  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    
    if (bIsFavorite) {
      removeFavorite(breed.id);
    } else {
      addFavorite(breed.id);
    }
  };

  return (
    // We remove the inline 'color' style so dark mode works
    <Link to={`/breed/${breed.id}`} style={{ textDecoration: 'none', position: 'relative' }}>
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
          zIndex: 10 // Make sure it's on top
        }}
      >
        {bIsFavorite ? '❤️' : '🤍'}
      </button>

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
        {/* This h3 will now correctly inherit dark mode color */}
        <h3 style={{ marginTop: "1rem" }}>{breed.name}</h3>
      </div>
    </Link>
  );
}

export default BreedCard;