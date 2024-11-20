import React from 'react'; 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import { GeneralProvider } from './context/GeneralContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </AuthProvider>
  </StrictMode>,
)
