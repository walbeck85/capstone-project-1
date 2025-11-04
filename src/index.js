import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { CompareProvider } from './context/CompareContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* BrowserRouter provides routing capabilities to the entire app.
      ThemeProvider provides the global dark/light mode state.
      CompareProvider provides the global list of breeds to compare.
    */}
    <BrowserRouter>
      <ThemeProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);