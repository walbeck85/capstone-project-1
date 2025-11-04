import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { CompareProvider } from './context/CompareContext'; // Correct import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CompareProvider> {/* Correct Provider */}
          <App />
        </CompareProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);