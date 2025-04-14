// pages/WelcomePage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };
  

  

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}></div>
          <div>
            <div style={styles.name}>Ronan Jake C. Paquera</div>
            <div style={styles.role}>ADMIN</div>
          </div>
        </div>
        <img src="/cit-logo.png" alt="CIT-U Logo" style={styles.logo} />
        <div>
          <button onClick={handleLogout} style={styles.logout}>⎋ Logout</button>
        </div>
      </header>

      <nav style={styles.navbar}>
        <Link to="/applicants" style={styles.navButton}>Applicant Profile</Link>
        <Link to="/list" style={styles.navButton}>List of Applicant</Link>
      </nav>

      <main style={styles.main}>
        <h2>Welcome to NASAMS Admin Panel</h2>
        <p>Select a section above to manage applicants.</p>

        <section style={styles.analytics}>
          <h3 style={styles.sectionTitle}>Dashboard Analytics</h3>
          <div style={styles.cards}>
            <div style={styles.card}>
              <h4>Total Applicants</h4>
              <p>48</p>
            </div>
            <div style={styles.card}>
              <h4>Approved</h4>
              <p>25</p>
            </div>
            <div style={styles.card}>
              <h4>Pending</h4>
              <p>15</p>
            </div>
            <div style={styles.card}>
              <h4>Rejected</h4>
              <p>8</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '1rem 2rem',
    borderBottom: '2px solid var(--sanguine-brown)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'gray',
  },
  name: {
    fontWeight: 'bold',
    color: 'var(--sanguine-brown)'
  },
  role: {
    fontSize: '0.8rem',
    color: 'gray'
  },
  logo: {
    height: '60px',
  },
  logout: {
    backgroundColor: 'transparent',
    color: 'var(--acadia)',
    border: '2px solid var(--acadia)',
    padding: '0.5rem 1.25rem',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  navbar: {
    backgroundColor: 'var(--sanguine-brown)',
    padding: '1rem',
    display: 'flex',
    gap: '1rem'
  },
  navButton: {
    backgroundColor: 'white',
    color: 'var(--sanguine-brown)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  main: {
    backgroundColor: 'white',
    margin: '2rem',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  analytics: {
    marginTop: '2rem'
  },
  sectionTitle: {
    marginBottom: '1rem',
    color: 'var(--acadia)'
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  card: {
    backgroundColor: 'var(--thatch)',
    padding: '1rem',
    borderRadius: '10px',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
  }
};

export default WelcomePage;