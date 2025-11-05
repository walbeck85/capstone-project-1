import React, { useEffect } from 'react';
import './Toast.css';

/**
 * A simple, non-blocking notification component.
 * It shows itself when `show` is true, and fades out.
 * It automatically calls `onClose` after 3 seconds.
 */
function Toast({ message, type, show, onClose }) {
  useEffect(() => {
    let timer;
    if (show) {
      // Set a timer to automatically close the toast
      timer = setTimeout(() => {
        onClose();
      }, 3000); // 3-second duration
    }
    // Cleanup function to clear the timer
    return () => {
      clearTimeout(timer);
    };
  }, [show, onClose]); // Re-run effect if 'show' or 'onClose' changes

  if (!show) {
    return null;
  }

  // Use the 'type' prop to determine the CSS class (e.g., 'success', 'error')
  return (
    <div className={`toast-notification ${type} ${show ? 'show' : ''}`}>
      {message}
      <button className="toast-close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default Toast;