import React from "react";
import "./Modal.css"; // We'll create this CSS file next

/**
 * A generic, reusable Modal component.
 *
 * @param {function} onClose - The function to call when the modal should be closed.
 * @param {React.ReactNode} children - The content to display inside the modal.
 */
function Modal({ children, onClose }) {
  return (
    // 1. The overlay that covers the whole screen
    <div className="modal-overlay" onClick={onClose}>
      {/* 2. The modal content box */}
      <div
        className="modal-content"
        // Stop click from bubbling up to the overlay
        onClick={(e) => e.stopPropagation()}
      >
        {/* 3. The close button */}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {/* 4. The content (e.g., our TemperamentFilter) */}
        {children}
      </div>
    </div>
  );
}

export default Modal;