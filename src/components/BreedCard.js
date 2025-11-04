import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CompareContext } from "../context/CompareContext";

function BreedCard({ breed }) {
  // Consume context to check/change compare list
  const { isInCompare, addCompare, removeCompare, compareCount } = useContext(CompareContext);
  const bIsInCompare = isInCompare(breed.id);

  // Helper to safely find the correct image URL
  const getImageUrl = () => {
    if (breed.image && breed.image.url) {
      return breed.image.url; // From /breeds list
    }
    if (breed.reference_image_id) {
      return `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`; // From /breeds/:id
    }
    return "https://via.placeholder.com/300x200"; // Fallback
  };
  
  const imageUrl = getImageUrl();

  // Handles click on the "Compare" button
  const handleCompareClick = (e) => {
    e.preventDefault(); // Stops the <Link> from navigating
    
    if (bIsInCompare) {
      removeCompare(breed.id);
    } else {
      if (compareCount < 3) {
        addCompare(breed.id);
      } else {
        alert("You can only compare up to 3 breeds at a time.");
      }
    }
  };

  return (
    // This <Link> makes the whole card clickable
    <Link to={`/breed/${breed.id}`} style={{ textDecoration: 'none', position: 'relative' }}>
      
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem",
        width: "300px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        height: "350px", 
        justifyContent: "space-between" 
      }}>
        
        {/* Top block (Image + Name) */}
        <div style={{ textAlign: "center" }}>
          <img 
            src={imageUrl} 
            alt={breed.name} 
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }} 
          />
          {/* minHeight ensures buttons align even if name wraps */}
          <h3 style={{ marginTop: "1rem", minHeight: "2.4em" }}>
            {breed.name}
          </h3>
        </div>

        {/* Bottom block (Button) */}
        <button 
          onClick={handleCompareClick} 
          style={{
            background: bIsInCompare ? '#61dafb' : '#fff',
            color: bIsInCompare ? '#000' : '#282c34', 
            border: '1px solid #ccc',
            borderRadius: '4px',    
            padding: '0.75rem',     
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            transition: 'background-color 0.2s ease',
          }}
        >
          {bIsInCompare ? '✓ Comparing' : 'Add to Compare'}
        </button>
      </div>
    </Link>
  );
}

export default BreedCard;