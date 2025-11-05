import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CompareContext } from "../context/CompareContext";

function BreedCard({ breed }) {
  // Consume context to check/change compare list
  const { isInCompare, addCompare, removeCompare, compareCount } =
    useContext(CompareContext);
  const bIsInCompare = isInCompare(breed.id);

  // --- UX FIX 3: State for notifications ---
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  // Effect to clear notifications after 3 seconds
  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(() => setNotification(""), 3000);
    }
    if (error) {
      timer = setTimeout(() => setError(""), 3000);
    }
    // Cleanup function to clear the timer if component unmounts
    return () => clearTimeout(timer);
  }, [notification, error]); // Re-run whenever messages change

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
      // Optional: add a remove notification if you want
      // setNotification(`${breed.name} removed.`);
      // setError("");
    } else {
      if (compareCount < 3) {
        addCompare(breed.id);
        // --- UX FIX 3: Set success notification ---
        setNotification(`${breed.name} added!`);
        setError("");
      } else {
        // --- UX FIX 3: Set error notification (replaces alert) ---
        setError("Compare limit is 3 breeds.");
        setNotification("");
      }
    }
  };

  // --- Style for the notification toasts ---
  const toastStyle = {
    position: "absolute",
    top: "16px",
    left: "16px",
    right: "16px",
    padding: "0.75rem",
    borderRadius: "6px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "0.9rem",
    zIndex: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    color: "#fff",
  };

  return (
    // This <Link> makes the whole card clickable
    // We add position: 'relative' to the Link's style so the toast can be positioned
    <Link
      to={`/breed/${breed.id}`}
      style={{ textDecoration: "none", position: "relative" }}
    >
      {/* --- UX FIX 3: Render notification toasts --- */}
      {notification && (
        <div
          style={{
            ...toastStyle,
            backgroundColor: "#28a745", // Green for success
          }}
        >
          {notification}
        </div>
      )}
      {error && (
        <div
          style={{
            ...toastStyle,
            backgroundColor: "#dc3545", // Red for error
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          margin: "1rem",
          width: "300px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          height: "350px",
          justifyContent: "space-between",
        }}
      >
        {/* Top block (Image + Name) */}
        <div style={{ textAlign: "center" }}>
          <img
            src={imageUrl}
            alt={breed.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
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
            background: bIsInCompare ? "#61dafb" : "#fff",
            color: bIsInCompare ? "#000" : "#282c34",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "0.75rem",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "bold",
            transition: "background-color 0.2s ease",
          }}
        >
          {/* --- UX FIX 1: Updated Button Text --- */}
          {bIsInCompare ? "✓ Added to Compare" : "Add to Compare"}
        </button>
      </div>
    </Link>
  );
}

export default BreedCard;