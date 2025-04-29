// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Admin Pages
import LandingPage from './pages/Admin/LandingPage';
import LoginPage from './pages/Admin/LoginPage';
import WelcomePage from './pages/Admin/WelcomePage';
import ApplicantProfilePage from './pages/Admin/ApplicantProfilePage';
import ApplicantDetailsPage from './pages/Admin/ApplicantDetailsPage';
import ListOfApplicantsPage from './pages/Admin/ListOfApplicantsPage';
import AddApplicantPage from './pages/Admin/AddApplicantPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        {isAuthenticated && (
          <>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/applicants" element={<ApplicantProfilePage />} />
            <Route path="/applicants/:id" element={<ApplicantDetailsPage />} />
            <Route path="/list" element={<ListOfApplicantsPage />} />
            <Route path="/add" element={<AddApplicantPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
