// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src="/school-logo.png" alt="CIT-U Logo" style={styles.logo} />
        <h1 style={styles.title}>NASAMS</h1>
        <p style={styles.subtitle}>Non-Academic Scholar Application Management System</p>
        <button style={styles.loginButton} onClick={() => navigate('/login')}>
          LOGIN
        </button>
        <footer style={styles.footer}>
          &copy; 2025 Cebu Institute of Technology - University. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#F5F5DC', // Light beige background
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem 3rem',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    textAlign: 'center',
    width: '400px',
    position: 'relative',
  },
  logo: {
    width: '120px',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#800000', // Maroon color
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '16px',
    color: '#5D4037',
    marginBottom: '2rem',
  },
  loginButton: {
    backgroundColor: '#800000',
    color: 'white',
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '1.5rem',
  },
  footer: {
    fontSize: '10px',
    color: '#999999',
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};

export default LandingPage;
