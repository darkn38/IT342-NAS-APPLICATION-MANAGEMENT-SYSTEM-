// src/pages/Applicant/ApplicantProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicantProfile = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Application Profile</h2>
      <div style={styles.profileBox}>
        <p><strong>Name:</strong> Ronan Jake C. Paquera</p>
        <p><strong>Department:</strong> Computer Studies</p>
        <p><strong>Year Level:</strong> 3rd Year</p>
        <p><strong>ID Number:</strong> 18-0340-101</p>
        <p><strong>Status:</strong> Pending</p>
        <p><strong>Remarks:</strong> Please upload your documents.</p>
      </div>
      <button style={styles.button} onClick={() => navigate('/applicant/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'var(--buff)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  profileBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'left',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  button: {
    backgroundColor: 'var(--sanguine-brown)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default ApplicantProfile;
