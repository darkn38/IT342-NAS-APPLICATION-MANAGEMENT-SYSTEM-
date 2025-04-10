import React from 'react';
import { Link } from 'react-router-dom';

const ApplicantDashboard = () => {
  return (
    <div>
      <h1>Welcome to the Applicant Dashboard</h1>
      <div>
        <Link to="/applicant/profile">
          <button>View Application Profile</button>
        </Link>
        <Link to="/applicant/upload">
          <button>Upload Documents</button>
        </Link>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
