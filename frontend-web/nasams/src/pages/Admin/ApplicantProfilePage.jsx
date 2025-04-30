// pages/ApplicantProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ApplicantProfilePage = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch applicants from the backend API
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('${BASE_URL}/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setApplicants(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to load applicants');
        setLoading(false);
      }
    };

    fetchApplicants();  // Call the function to fetch applicants on component mount
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Applicant Profile List</h2>
          <button style={styles.closeBtn} onClick={() => navigate('/welcome')}>✕</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          {loading ? (
            <p>Loading applicants...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Applicant Profile</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map(app => (
                  <tr key={app.id} style={styles.tr}>
                    <td style={styles.td}>{app.firstName} {app.lastName}</td>
                    <td style={styles.td}><Link to={`/applicants/${app.id}`} style={styles.link}>View Profile</Link></td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...getStatusColor(app.status) }}>{app.status}</span>
                    </td>
                    <td style={styles.td}>{app.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// Function to style the status badge
const getStatusColor = (status) => {
  switch (status) {
    case 'Approved': return { backgroundColor: '#d4edda', color: '#155724' };
    case 'Rejected': return { backgroundColor: '#f8d7da', color: '#721c24' };
    case 'Pending':
    default: return { backgroundColor: '#fff3cd', color: '#856404' };
  }
};

const styles = {
  wrapper: {
    padding: '2rem',
    backgroundColor: 'var(--sanguine-brown)', // Design color
    minHeight: '100vh',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  heading: {
    margin: 0,
    color: 'var(--acadia)',
    fontSize: '1.8rem',
  },
  closeBtn: {
    fontSize: '1.2rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'var(--acadia)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    backgroundColor: '#f0f0f0',
  },
  th: {
    padding: '1rem',
    textAlign: 'center',
    fontWeight: '600',
    color: 'var(--acadia)',
    borderBottom: '2px solid #ddd',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '1rem',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  badge: {
    padding: '0.3rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    display: 'inline-block',
  },
  link: {
    color: 'var(--sanguine-brown)',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};

export default ApplicantProfilePage;
