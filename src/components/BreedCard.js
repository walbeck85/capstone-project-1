import React, { useState, useContext, useEffect } from "react";
import { CompareContext } from "../context/CompareContext";
import "./BreedCard.css"; // Handles the flip animation
import Toast from "./Toast"; // Import the Toast component

function BreedCard({ breed }) {
  // --- Context ---
  const { isInCompare, addCompare, removeCompare, compareCount } = useContext(CompareContext);
  const bIsInCompare = isInCompare(breed.id);

  // --- Local State ---
  const [isFlipped, setIsFlipped] = useState(false);
  const [details, setDetails] = useState(null); // To store data from the new fetch
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Toast State ---
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // --- Image URL Helper ---
  const getImageUrl = () => {
    if (breed.image && breed.image.url) return breed.image.url;
    if (breed.reference_image_id) return `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
    return "https://via.placeholder.com/300x200"; // Fallback
  };
  const imageUrl = getImageUrl();

  // --- Toast Timer Effect ---
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000); // Hide toast after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // --- API Fetch for Card Details ---
  const fetchBreedDetails = async () => {
    if (details) {
      setIsFlipped(true); 
      return;
    }
    setIsLoading(true);
    setIsFlipped(true);
    setError(null);
    try {
      const response = await fetch(`https://api.thedogapi.com/v1/breeds/${breed.id}`, {
        headers: { "x-api-key": process.env.REACT_APP_DOG_API_KEY },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setDetails(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Event Handlers ---
  const handleCardClick = () => {
    if (!isFlipped) {
      fetchBreedDetails();
    } else {
      setIsFlipped(false);
    }
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    setToast({ show: false, message: "", type: "" });
    if (bIsInCompare) {
      removeCompare(breed.id);
      setToast({ show: true, message: `${breed.name} removed from compare.`, type: "success" });
    } else {
      if (compareCount < 3) {
        addCompare(breed.id);
        setToast({ show: true, message: `${breed.name} added to compare!`, type: "success" });
      } else {
        setToast({ show: true, message: "Compare limit is 3.", type: "error" });
      }
    }
  };

  const handleToastClose = () => {
    setToast({ show: false, message: "", type: "" });
  };

  // --- Render ---
  return (
    <div className="card-scene" onClick={handleCardClick}>
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={handleToastClose} 
      />
      
      <div className={`card-container ${isFlipped ? "is-flipped" : ""}`}>
        
        {/* === CARD FRONT === */}
        <div className="card-face card-face-front">
          <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
            <img
              src={imageUrl}
              alt={breed.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: "4px 4px 0 0"
              }}
            />
            
            <h3 style={{
              margin: "0.75rem 0.5rem 3.5rem 0.5rem",
              fontSize: "1.1rem",
              lineHeight: "1.3em",
              overflow: "hidden",
              textAlign: "center"
            }}>
              {breed.name}
            </h3>
            
            <button
              onClick={handleCompareClick}
              style={{
                background: bIsInCompare ? '#61dafb' : '#fff',
                color: bIsInCompare ? '#000' : '#282c34',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '0.6rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'background-color 0.2s ease',
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem'
              }}
            >
              {bIsInCompare ? '✓ Added to Compare' : 'Add to Compare'}
            </button>
          </div>
        </div>
        
        {/* === CARD BACK (DETAILS) === */}
        <div className="card-face card-face-back">
          {isLoading && <h4>Loading details...</h4>}
          {error && <h4 style={{ color: 'red' }}>Error: {error}</h4>}
          {details && (
            <div style={{ padding: '1rem', fontSize: '0.85rem', textAlign: 'left' }}> {/* Slightly smaller font to fit more */}
              <h4 style={{ marginTop: 0, marginBottom: '0.75rem', borderBottom: '1px solid #555' }}>{details.name}</h4>
              <p><strong>Temperament:</strong> {details.temperament}</p>
              <p><strong>Life Span:</strong> {details.life_span}</p>
              <p><strong>Weight:</strong> {details.weight.imperial} lbs</p>
              <p><strong>Bred For:</strong> {details.bred_for}</p>
              {/* *** THESE ARE THE NEW FIELDS *** */}
              <p><strong>Origin:</strong> {details.origin || 'N/A'}</p> {/* Added || 'N/A' for safety */}
              <p><strong>Breed Group:</strong> {details.breed_group || 'N/A'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BreedCard;