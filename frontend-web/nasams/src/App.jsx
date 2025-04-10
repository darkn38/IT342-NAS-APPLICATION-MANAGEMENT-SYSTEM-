import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Pages
import LandingPage from './pages/Admin/LandingPage';
import LoginPage from './pages/Admin/LoginPage';
import WelcomePage from './pages/Admin/WelcomePage';
import ApplicantProfilePage from './pages/Admin/ApplicantProfilePage';
import ApplicantDetailsPage from './pages/Admin/ApplicantDetailsPage';
import ListOfApplicantsPage from './pages/Admin/ListOfApplicantsPage';
import AddApplicantPage from './pages/Admin/AddApplicantPage';

// Applicant Pages
import ApplicantLandingPage from './pages/Applicant/ApplicantLandingPage';
import ApplicantLoginPage from './pages/Applicant/ApplicantLoginPage';
import ApplicantDashboard from './pages/Applicant/ApplicantDashboard';
import ApplicantProfile from './pages/Applicant/ApplicantProfile';
import UploadDocuments from './pages/Applicant/UploadDocuments';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/applicants" element={<ApplicantProfilePage />} />
        <Route path="/applicants/:id" element={<ApplicantDetailsPage />} />
        <Route path="/list" element={<ListOfApplicantsPage />} />
        <Route path="/add" element={<AddApplicantPage />} />

        {/* Applicant Routes */}
        <Route path="/applicant" element={<ApplicantLandingPage />} />
        <Route path="/applicant/login" element={<ApplicantLoginPage />} />
        <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
        <Route path="/applicant/profile" element={<ApplicantProfile />} />
        <Route path="/applicant/upload" element={<UploadDocuments />} />
      </Routes>
    </Router>
  );
}

export default App;
