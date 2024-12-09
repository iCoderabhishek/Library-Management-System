import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in by looking for the token in localStorage
  const token = localStorage.getItem('authToken');

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the token exists, allow access to the protected route
  return children;
};

export default ProtectedRoute;
