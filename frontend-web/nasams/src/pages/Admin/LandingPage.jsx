// pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src="/school-logo.png" alt="CIT-U Logo" style={styles.logo} />
        <h2 style={styles.title}>CEBU INSTITUTE OF TECHNOLOGY<br />UNIVERSITY</h2>
        <h3 style={styles.subtitle}>NON-ACADEMIC SCHOLAR<br />APPLICATION MANAGEMENT SYSTEM</h3>
        <button onClick={() => navigate('/login')}>login</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--sanguine-brown)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem 3rem',
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
  },
  logo: {
    width: '90px',
    marginBottom: '1rem',
  },
  title: {
    color: 'var(--acadia)',
    marginBottom: '0.5rem',
    fontSize: '16px',
    fontWeight: 'normal',
  },
  subtitle: {
    color: 'var(--sanguine-brown)',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '2rem',
  },
};

export default LandingPage;