import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// ProtectedRoute component to ensure that the user is logged in
const ProtectedRoute = ({ element, ...rest }) => {
  const isLoggedIn = localStorage.getItem('jwtToken');  // Check if JWT token exists in localStorage
  
  return (
    <Route
      {...rest}
      element={isLoggedIn ? element : <Navigate to="/applicant/login" />}
    />
  );
};

export default ProtectedRoute;
// This component checks if the user is logged in by checking for a JWT token in localStorage.