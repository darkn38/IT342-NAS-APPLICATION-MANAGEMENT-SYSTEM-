// src/pages/Admin/WelcomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const WelcomePage = () => {
  const navigate = useNavigate();
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [approvedApplicants, setApprovedApplicants] = useState(0);
  const [pendingApplicants, setPendingApplicants] = useState(0);
  const [rejectedApplicants, setRejectedApplicants] = useState(0);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`${BASE_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const applicants = response.data.filter(user => user.role !== 'ADMIN');

        setTotalApplicants(applicants.length);
        setApprovedApplicants(applicants.filter(user => user.status === 'Approved').length);
        setPendingApplicants(applicants.filter(user => user.status === 'Pending').length);
        setRejectedApplicants(applicants.filter(user => user.status === 'Rejected').length);
      } catch (error) {
        console.error('Failed to fetch applicants:', error);
      }
    };

    fetchApplicants();
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('jwtToken');
      navigate('/login');
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.leftHeader}>
          <img src="/cit-logo.png" alt="CIT-U Logo" style={styles.logo} />
          <span style={styles.schoolName}>CIT-U</span>
        </div>
        <div style={styles.rightHeader}>
          <span style={styles.adminName}>Ronan Jake C. Paquera</span>
          <div style={styles.avatar}>RP</div>
          <button onClick={handleLogout} style={styles.logoutBtn}>⎋ Logout</button>
        </div>
      </header>

      {/* Welcome Banner */}
      <section style={styles.banner}>
        <h2 style={styles.bannerTitle}>Welcome back, Ronan Jake C. Paquera</h2>
        <p style={styles.bannerSubtitle}>Admin • {today}</p>
      </section>

      {/* Dashboard Cards */}
      <section style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.cardIcon}></div>
          <h3 style={styles.cardNumber}>{totalApplicants}</h3>
          <p style={styles.cardLabel}>Total Applicants</p>
        </div>
        <div style={styles.cardGreen}>
          <div style={styles.cardIcon}></div>
          <h3 style={styles.cardNumber}>{approvedApplicants}</h3>
          <p style={styles.cardLabel}>Approved</p>
        </div>
        <div style={styles.cardAmber}>
          <div style={styles.cardIcon}></div>
          <h3 style={styles.cardNumber}>{pendingApplicants}</h3>
          <p style={styles.cardLabel}>Pending</p>
        </div>
        <div style={styles.cardRed}>
          <div style={styles.cardIcon}></div>
          <h3 style={styles.cardNumber}>{rejectedApplicants}</h3>
          <p style={styles.cardLabel}>Rejected</p>
        </div>
      </section>

      {/* Navigation Buttons */}
      <section style={styles.navButtons}>
        <Link to="/applicants" style={styles.navBtn}>Applicant Profile</Link>
        <Link to="/list" style={styles.navBtn}>List of Applicants</Link>
      </section>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#F5F5DC',
    minHeight: '100vh',
    paddingBottom: '2rem',
  },
  header: {
    backgroundColor: 'white',
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    borderBottom: '1px solid #E0E0E0',
  },
  leftHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '40px',
    marginRight: '1rem',
  },
  schoolName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#800000',
  },
  rightHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  adminName: {
    fontSize: '14px',
    color: '#5D4037',
  },
  avatar: {
    backgroundColor: '#5D4037',
    color: 'white',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #800000',
    color: '#800000',
    borderRadius: '8px',
    padding: '0.25rem 1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  banner: {
    margin: '2rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
  },
  bannerTitle: {
    fontSize: '20px',
    color: '#5D4037',
    marginBottom: '0.5rem',
  },
  bannerSubtitle: {
    fontSize: '14px',
    color: '#999999',
  },
  cardsContainer: {
    display: 'flex',
    gap: '1rem',
    margin: '2rem',
    flexWrap: 'wrap',
  },
  card: {
    flex: '1',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  cardGreen: {
    flex: '1',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    borderTop: '4px solid #4CAF50',
  },
  cardAmber: {
    flex: '1',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    borderTop: '4px solid #FFC107',
  },
  cardRed: {
    flex: '1',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    borderTop: '4px solid #F44336',
  },
  cardIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#F5F5DC',
    margin: '0 auto 0.5rem auto',
  },
  cardNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#5D4037',
  },
  cardLabel: {
    fontSize: '14px',
    color: '#999999',
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
    gap: '2rem',
  },
  navBtn: {
    backgroundColor: 'white',
    color: '#800000',
    padding: '0.75rem 2rem',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold',
    boxShadow: '0 5px 10px rgba(0,0,0,0.15)',
    border: '1px solid #E0E0E0',
  }
};

export default WelcomePage;
