// src/pages/Applicant/ApplicantLandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicantLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src="/school-logo.png" alt="CIT-U Logo" style={styles.logo} />
        <h1 style={styles.title}>Cebu Institute of Technology - University</h1>
        <h2 style={styles.systemName}>Non-Academic Scholar Application Management System</h2>
      </header>

      <main style={styles.main}>
        <p style={styles.welcomeMessage}>
          Welcome to the NASAMS Applicant Portal. Please log in to continue your application process.
        </p>
        <button style={styles.loginButton} onClick={() => navigate('/applicant/login')}>
          Applicant Login
        </button>
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2025 Cebu Institute of Technology - University. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--buff)',
    color: 'var(--acadia)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  header: {
    backgroundColor: 'white',
    padding: '1rem',
    borderBottom: '3px solid var(--sanguine-brown)',
  },
  logo: {
    width: '80px',
    marginBottom: '0.5rem',
  },
  title: {
    margin: '0.2rem 0',
    fontSize: '1.2rem',
    color: 'var(--acadia)',
  },
  systemName: {
    margin: '0.5rem 0',
    fontSize: '1rem',
    color: 'var(--sanguine-brown)',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  welcomeMessage: {
    fontSize: '1rem',
    maxWidth: '400px',
    marginBottom: '1.5rem',
  },
  loginButton: {
    backgroundColor: 'var(--sanguine-brown)',
    color: 'white',
    padding: '0.8rem 2rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  footer: {
    backgroundColor: 'white',
    padding: '1rem',
    borderTop: '2px solid var(--acadia)',
    fontSize: '0.8rem',
    color: 'var(--acadia)',
  },
};

export default ApplicantLandingPage;
