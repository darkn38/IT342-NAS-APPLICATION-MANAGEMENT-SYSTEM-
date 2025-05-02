// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Pages
import LandingPage from './pages/Admin/LandingPage';
import LoginPage from './pages/Admin/LoginPage';
import WelcomePage from './pages/Admin/WelcomePage';
import ApplicantProfilePage from './pages/Admin/ApplicantProfilePage';
import ApplicantDetailsPage from './pages/Admin/ApplicantDetailsPage';
import ListOfApplicantsPage from './pages/Admin/ListOfApplicantsPage';
import AddApplicantPage from './pages/Admin/AddApplicantPage';

// Protected Route Wrapper
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/welcome"
          element={<ProtectedRoute element={<WelcomePage />} />}
        />
        <Route
          path="/applicants"
          element={<ProtectedRoute element={<ApplicantProfilePage />} />}
        />
        <Route
          path="/applicants/:id"
          element={<ProtectedRoute element={<ApplicantDetailsPage />} />}
        />
        <Route
          path="/list"
          element={<ProtectedRoute element={<ListOfApplicantsPage />} />}
        />
        <Route
          path="/add"
          element={<ProtectedRoute element={<AddApplicantPage />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
