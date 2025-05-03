// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('jwtToken');

  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;