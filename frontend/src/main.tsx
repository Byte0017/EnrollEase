import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.tsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap everything with BrowserRouter */}
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);